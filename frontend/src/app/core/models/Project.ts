export interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  level: number;
}

export interface ProjectImage {
  id: number;
  url: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  stack: string[];
  repo_url: string | null;
  demo_url: string | null;
  cover_image: string | null;
  is_featured: boolean;
  status: 'draft' | 'published';
  skills: Skill[];
  images: ProjectImage[];
  created_at: string;
}