export interface ListItem {
  type: 'video' | 'article';
  url?: string;
  title?: string;
  views: number;
};

export interface HighlightedComponentProps {
  children: React.ReactNode;
};