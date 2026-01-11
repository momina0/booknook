export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  cover_url?: string | null;
  isbn?: string | null;
  genre?: string | null;
  pages?: number | null;
  date_read?: string | null;
  rating?: number | null;
  review?: string | null;
  status?: "reading" | "read" | "want-to-read";
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  book_id?: string | null;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  isbn?: string[];
}
