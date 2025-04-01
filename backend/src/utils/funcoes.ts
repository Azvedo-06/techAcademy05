import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import ReviewsModel from "../models/ReviewsModel";
import CategoryModel from "../models/CategoryModel";
import BookModel from "../models/BookModel";
import AuthorModel from "../models/AuthorModel";

/*
export async function mountPagenation(filtes:any) {
    filtes.sortBy  = filtes.sortBy ? filtes.sortBy : "id"
    filtes.descending = filtes.descending ? JSON.parse(filtes.descending) : false 
    filtes.page = filtes.page ? +filtes.page : 1
    filtes.rowsPerPage = filtes.rowsPerPage ? +filtes.rowsPerPage : 10

    return +filtes.rowsPerPage > 0 ? {
        ofset: +filtes.rowsPerPage*(+filtes.page - 1),
        limet: +filtes.rowsPerPage
    }: {}
}
*/

export function validateNameUser(name:string): void {
    if (!name || name.trim() === "") {
        throw ("Nome é obrigatório");
    }
}

export function validateNameCategory(name: string): void {
    if (!name || name.trim() === "") {
        throw ("Nome da categoria obrigatório");
    }
}

export function validateBookTitle(title:string): void {
    if(!title || title.trim() === "") {
        throw ("Titulo é obrigatório");
    }
}

export function validateAuthorComments(comments:string): void {
    if (!comments || comments.trim() === "" ) {
        throw ("Comentário é obrigatório");
    }
}

export function validateUserEmail(email:string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regex.test(email)) {
        throw ("email inválido");
    }
}

export function validateUserCpf(cpf:string): void {
    const cpfLimpo = cpf.replace(/\D/g, ''); // só deixa os numeros do cpf
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo) || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        throw ("cpf inválido");
    }
}

export function validateUserPassword(password:string): void {
    if (!password || password.length < 6) {
        throw ("A senha deve ter pelo menos 6 caracteres");
    }
}

export function validateUserHash(password:string) {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function validateUserExist(id:number): Promise<UserModel>  {
    const user = await UserModel.findByPk(id);
    if (!user) {
        throw ("Usuário não encontrado");
    }
    return user;
}

export function validateReviewsNota(nota:number): void {
    if (!nota) {
        throw ("Nota é obrigatório");
    }       
}

export async function validateReviewsExist(id:number): Promise<ReviewsModel>  {
    const reviews = await ReviewsModel.findByPk(id);
    if (!reviews) {
        throw ("Comentario não encontrado");
    }
    return reviews;
}

export async function validateCategoryExist(id:number): Promise<CategoryModel> {
    const category = await CategoryModel.findByPk(id);
    if (!category) {
        throw ("Categoria não encontrada");
    }
    return category;
}

export async function validateBookExist(id:number): Promise<BookModel> {
    const book = await BookModel.findByPk(id);
    if(!book) {
        throw ("Livro não encontrado");
    }
    return book;
}

export function validateBookDate(publication_date:Date): Date {
    const publicationDate = new Date(publication_date);
    if (isNaN(publicationDate.getTime())) {
        throw ("Data de publicação inválida");
    }
    return publicationDate;
}

export function validateBookDescription(description:string): void {
    if (!description || description.trim() === "") {
        throw ("Descrição é obrigatório");
    }
} 

export function validateAuthorBio(bio:string): void {
    if (!bio || bio.trim() === "") {
        throw ("Bio é obrigatório");
    }
}

export async function validateAuthorExist(id:number): Promise<AuthorModel> {
    const author = await AuthorModel.findByPk(id);
    if(!author) {
        throw ("Livro não encontrado");
    }
    return author;
}

export function validateAuthorDate(birth:Date): Date {
    const birthAuthor = new Date(birth);
    if (isNaN(birth.getTime())) {
        throw ("Data de publicação inválida");
    }
    return birthAuthor;
}