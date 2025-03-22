import CategoryService from "../services/categoryService";
import { Request, Response } from "express";

const categoryService = new CategoryService();
class categoryController {
    public async createCategoryController(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { name } = req.body;
            const category = await categoryService.createCategory(name);

            return res.status(201).json(category);
        } catch (error) {
            return res.status(400).json({error: "erro ao criar categoria: " + error});
        }
    }

    public async deleteCategotyController(req:Request<{id:string}>, res: Response): Promise<Response> {
        try {
            const categoryDelete = await categoryService.deleteCategory(Number(req.params.id)); 
            return res.status(200).json(categoryDelete);
        } catch (error) {
            return res.status(400).json({error: "erro ao tentar deletar a categoria: " + error});
        }
    };

    public async findAllCategoryController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const users = await categoryService.findAllCategory();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({error: "erro ao buscar categorias: " + error});
        }
    };

    public async findCategoryByIdController(req:Request<{id:string}>, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const user = await categoryService.findCategoryById(Number(req.params.id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({error: "erro ao tentar encontrar categoria: " + error});
        }
    }

    public async updateCategoryController(req:Request, res:Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {id} = req.params;
            const { name } = req.body;
        
            const update = await categoryService.updateCategory(
                parseInt(id, 10),
                name
            )

            return res.status(201).json(update);
        } catch (error) {
            return res.status(400).json({error: "erro ao tentar atualizar categoria: " + error});
        }
    }
};

export default categoryController;