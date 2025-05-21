import BookModel from "../models/BookModel";

export async function validateBookExist(id: number): Promise<BookModel> {
  const book = await BookModel.findByPk(id);
  if (!book) {
    throw new Error("Livro não encontrado");
  }
  return book;
}

export function validateBookTitle(title: string): void {
  if (!title || title.trim() === "") {
    throw new Error("Título do livro é obrigatório");
  }
}

export function validateBookDescription(description: string): void {
  if (!description || description.trim() === "") {
    throw new Error("Descrição é obrigatória");
  }
}

export function validateBookDate(publication_date: string | Date): Date {
  if (!publication_date) {
    throw new Error("Data de publicação é obrigatória");
  }

  let date: Date;
  if (typeof publication_date === 'string') {
    date = new Date(publication_date);
  } else {
    date = publication_date;
  }

  if (isNaN(date.getTime())) {
    throw new Error("Data de publicação inválida");
  }

  return date;
}
