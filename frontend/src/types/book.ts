export interface Book {
  id: string;
  title: string;
  description: string;
  publicationDate: string;
  coverImage: string | null;
  coverImageType: string | null;
  bookPdf: string | null;
  bookPdfName: string | null;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}
