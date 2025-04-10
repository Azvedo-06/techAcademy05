export interface Book {
  id: string;
  title: string;
  description: string;
  publication_date: Date;
  coverImage: Buffer | null;
  coverImageType: string | null;
  bookPdf: Buffer | null;
  bookPdfName: string | null;
  authorId: number | null;
  categoryId: number | null;
}
