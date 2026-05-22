export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  tags: string[];
  mainImage: string; // The primary high-fidelity illustration loaded
  color: string;     // Accent background or visual color
  layoutStyle: 'left' | 'right' | 'split';
  stats: { label: string; value: string }[];
  process: string[];
  repoUrl?: string; // Real GitHub repository URL
}

export interface MarqueeCard {
  id: string;
  type: 'image' | 'typography' | 'sketch' | 'panel';
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  aspectRatioClassName?: string;
  badge?: string;
  highlightText?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  descriptionText: string;
  japaneseTranslation: string;
  tag: string;
  panelAnimationClass?: string;
}
