import { create } from "zustand";
import { AppContentId, WindowState } from "../types";

interface DesktopState {
  isBooting: boolean;
  developerMode: boolean;
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;
  finishBoot: () => void;
  enableDeveloperMode: () => void;
  openWindow: (
    id: string,
    title: string,
    contentId: AppContentId,
    defaultSize?: { width: number; height: number },
    url?: string
  ) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPos: (id: string, pos: { x: number; y: number }) => void;
  updateWindowSize: (
    id: string,
    size: { width: number; height: number },
  ) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  isBooting: true,
  developerMode: false,
  windows: [],
  activeWindowId: null,
  highestZIndex: 10,

  finishBoot: () => set({ isBooting: false }),

  enableDeveloperMode: () => set({ developerMode: true }),

  openWindow: (
    id,
    title,
    contentId,
    defaultSize = { width: 600, height: 450 },
    url
  ) => {
    const { windows, highestZIndex } = get();

    // Check if already open
    const existing = windows.find((w) => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: state.highestZIndex + 1 }
              : w,
          ),
          highestZIndex: state.highestZIndex + 1,
          activeWindowId: id,
        }));
      } else {
        get().focusWindow(id);
      }
      return;
    }

    // Determine position (staggered slightly)
    const offset = (windows.length % 5) * 30;
    const position = { x: 100 + offset, y: 50 + offset };

    const newWindow: WindowState = {
      id,
      title,
      contentId,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position,
      size: defaultSize,
      zIndex: highestZIndex + 1,
      url,
    };

    set((state) => ({
      windows: [...state.windows, newWindow],
      highestZIndex: state.highestZIndex + 1,
      activeWindowId: id,
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId:
        state.activeWindowId === id
          ? state.windows.length > 1
            ? state.windows[state.windows.length - 2].id
            : null
          : state.activeWindowId,
    }));
  },

  focusWindow: (id) => {
    const { activeWindowId, highestZIndex } = get();
    if (activeWindowId === id) return;

    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.highestZIndex + 1 } : w,
      ),
      highestZIndex: state.highestZIndex + 1,
      activeWindowId: id,
    }));
  },

  toggleMinimize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
      activeWindowId: state.windows.find((w) => w.id === id)?.isMinimized
        ? state.activeWindowId
        : null, // If minimizing, drop active
    }));
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w,
      ),
    }));
  },

  updateWindowPos: (id, pos) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position: pos } : w,
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }));
  },
}));
