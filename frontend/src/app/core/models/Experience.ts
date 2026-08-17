export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  type: 'stage' | 'emploi' | 'projet';
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
}