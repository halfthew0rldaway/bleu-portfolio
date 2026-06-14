export type AppContentId =
  | "readme"
  | "applications"
  | "toolbox"
  | "lab"
  | "contact"
  | "github"
  | "terminal"
  | "browser";

export interface WindowState {
  id: string;
  title: string;
  contentId: AppContentId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  url?: string;
}
