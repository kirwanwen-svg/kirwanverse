export interface FashionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: FashionCategory;
  tags: string[];
  colorPalette: string[];
  style: string;
  season: string;
  createdAt: Date;
  likes: number;
  downloads: number;
}

export type FashionCategory = 
  | 'streetwear'
  | 'formal'
  | 'casual'
  | 'vintage'
  | 'minimalist'
  | 'bohemian'
  | 'sporty'
  | 'elegant'
  | 'edgy'
  | 'romantic';

export interface FilterOptions {
  category?: FashionCategory;
  color?: string;
  style?: string;
  season?: string;
  tags?: string[];
}

export interface SearchResult {
  items: FashionItem[];
  total: number;
  page: number;
  hasMore: boolean;
}

