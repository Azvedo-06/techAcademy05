import AuthorService from "../services/authorService";
import { Request, Response } from "express";

const authorService = new AuthorService();
class authorController {
  public async createAuthorController(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { name, bio, birth } = req.body;
      const author = await authorService.createAuthor(name, birth, bio);

      return res.status(201).json(author);
    } catch (error) {
      return res.status(500).json({ error: "erro ao criar autor: " + error });
    }
  }

  public async deleteAuthorController(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const authorDelete = await authorService.deleteAuthor(
        Number(req.params.id)
      );

      return res.status(204).json(authorDelete);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao tentar deletar autor: " + error });
    }
  }

  public async findAllAuthorController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const authors = await authorService.findAllAuthors();
      return res.status(200).json(authors);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      return res.status(500).json({
        error: `Erro ao buscar autores: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }

  public async findAuthorByIdController(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const author = await authorService.findAuthorById(Number(req.params.id));

      return res.status(200).json(author);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "erro ao tentar encontrar Autor: " + error });
    }
  }

  public async updateAuthorController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, bio, birth } = req.body;

      const updatedAuthor = await authorService.updateAuthor(
        Number(id),
        name,
        bio,
        new Date(birth)
      );

      return res.status(200).json(updatedAuthor);
    } catch (error) {
      console.error("Erro ao atualizar autor:", error);
      return res.status(500).json({
        error: `Erro ao atualizar autor: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }
}

export default authorController;
