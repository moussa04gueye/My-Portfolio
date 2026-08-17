export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover_image: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  tags: Tag[];
}