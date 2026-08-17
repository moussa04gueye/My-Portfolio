export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read_at: string | null;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}