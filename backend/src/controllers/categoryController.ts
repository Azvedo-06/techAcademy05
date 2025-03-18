import CategoryService from "../services/categoryService";
import { Request, Response } from "express";

class categoryController {
    public async createCategoryController(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const categoryService = new CategoryService();
            const { name } = req.body;
            const category = await categoryService.createCategory(name);
            return res.status(201).json({ message: "Category created successfully", category });
        } catch (error) {
            return res.status(400).json({error: "Erro ao criar categoria: " + error});
        }
    }

    public async deleteCategotyController(req:Request<{id:string}>, res: Response): Promise<Response> {
        try {
            const categoryService = new CategoryService();
            const message = await categoryService.deleteCategory(Number(req.params.id)); 
            return res.status(200).json({message});
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar deletar a categoria: " + error});
        }
    };

    public async findAllCategoryController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const categoryService = new CategoryService();
            const users = await categoryService.findAllCategory();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({error: "Erro ao buscar categorias. Tente novamente: " + error});
        }
    };

    public async findCategoryByIdController(req:Request<{id:string}>, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const categoryService = new CategoryService();
            const user = await categoryService.findCategoryById(Number(req.params.id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar encontrar categoria: " + error});
        }
    }

    public async updateCategoryController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const categoryService = new CategoryService();
            const {id} = req.params;
            const { name } = req.body;
        
            const update = await categoryService.updateCategory(
                parseInt(id, 10),
                name
            )

            return res.status(201).json(update);
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar atualizar categoria: " + error});
        }
    }
};

export default categoryController;