import authorService from "../services/authorService";
import AuthorService from "../services/authorService";
import {Request, Response } from "express";

class authorController {
    public async createAuthorController(req:Request, res:Response) {
        try {
            const authorService = new AuthorService();
            const {name, bio, birth} = req.body;
            const author = await authorService.createAuthor(name, bio, birth);
            return res.status(201).json({ message: "User created successfully", author });
        } catch (error) {
            return res.status(400).json({error: "Erro ao criar autor: " + error});
        }    
    }

    public async deleteAuthorController(req:Request<{id:string}>, res: Response) {
        try {
            const authorService = new AuthorService();
            const message = await authorService.deleteAuthor(Number(req.params.id)); 
            return res.status(200).json({message});
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar deletar autor: " + error});
        }
    };

    public async findAllAuthorController(req:Request, res:Response) {
        try {
            const authorService = new AuthorService();
            const Author = await authorService.findAllAuthor();
            return res.status(200).json(Author);
        } catch (error) {
            return res.status(400).json({error: "Erro ao buscar Autores. Tente novamente: " + error});
        }
    };

    public async findAuthorByIdController(req:Request<{id:string}>, res:Response) {
        try {
            const authorService = new AuthorService();
            const author = await authorService.findAuthorById(Number(req.params.id));
            return res.status(200).json(author);
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar encontrar Autor: " + error});
        }
    }

    public async updateAuthorController(req:Request, res:Response) {
        try {
            const authorService = new AuthorService();
            const {id} = req.params;
            const {name, bio, birth} = req.body;
        
            const update = await authorService.updateAuthor(
                parseInt(id, 10),
                name,
                bio,
                birth
            );

            return res.status(201).json(update);
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar atualizar autor: " + error});
        }
    }
};

export default authorController;