import AuthorModel from "../models/AuthorModel";
import { validateNamAll } from "../utils/validateName";
import { validateAuthorDate } from "../utils/validateDate";
import { validateAuthorBio } from "../utils/validateDescription";

class AuthorService {
  public async findAllAuthors(): Promise<AuthorModel[]> {
    try {
      const authors = await AuthorModel.findAll({
        attributes: ["id", "name", "bio", "birth"],
        order: [["name", "ASC"]],
      });

      return authors;
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      throw error;
    }
  }

  public async createAuthor(
    name: string,
    birth: Date,
    bio: string
  ): Promise<AuthorModel> {
    try {
      if (!validateNamAll(name)) {
        throw "Nome do autor é obrigatório";
      }
      validateAuthorBio(bio);
      const dateBirth = validateAuthorDate(birth);

      const newAuthor = await AuthorModel.create({
        name,
        birth: dateBirth,
        bio,
      });

      return newAuthor;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async deleteAuthor(id: number): Promise<void> {
    try {
      await AuthorModel.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  public async findAuthorById(id: number): Promise<AuthorModel> {
    try {
      const author = await AuthorModel.findByPk(id);
      if (!author) {
        throw "Autor não encontrado";
      }
      return author;
    } catch (error) {
      throw error;
    }
  }

  public async updateAuthor(
    id: number,
    name: string,
    bio: string,
    birth: Date
  ): Promise<AuthorModel> {
    try {
      if (!validateNamAll(name)) {
        throw "Nome do autor é obrigatório";
      }
      validateAuthorBio(bio);
      const dateBirth = validateAuthorDate(birth);

      await AuthorModel.update(
        {
          name,
          bio,
          birth: dateBirth,
        },
        { where: { id } }
      );

      const updatedAuthor = await AuthorModel.findByPk(id);
      if (!updatedAuthor) {
        throw "Autor não encontrado após atualização";
      }

      return updatedAuthor;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthorService;
