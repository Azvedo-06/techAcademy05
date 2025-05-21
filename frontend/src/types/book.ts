export interface Book {
  id: number;
  title: string;
  description: string;
  publication_date: string;
  coverImage?: string;
  coverImageType?: string;
  authorId: number;
  categoryId: number;
  author?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
}
