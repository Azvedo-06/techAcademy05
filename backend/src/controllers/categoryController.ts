import CategoryService from "../services/categoryService";
import { Request, Response } from "express";

const categoryService = new CategoryService();

class CategoryController {
  public async findAllCategoryController(req: Request, res: Response) {
    try {
      const categories = await categoryService.findAllCategory();
      return res.status(200).json(categories);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao buscar categorias: " + error });
    }
  }

  public async createCategoryController(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const category = await categoryService.createCategory(name, description);
      return res.status(201).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao criar categoria: " + error });
    }
  }

  public async deleteCategotyController(req: Request, res: Response) {
    try {
      const categoryDelete = await categoryService.deleteCategory(
        Number(req.params.id)
      );
      return res.status(204).json(categoryDelete);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao deletar categoria: " + error });
    }
  }

  public async findCategoryByIdController(req: Request, res: Response) {
    try {
      const category = await categoryService.findCategoryById(
        Number(req.params.id)
      );
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao buscar categoria: " + error });
    }
  }

  public async updateCategoryController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const update = await categoryService.updateCategory(
        Number(id),
        name,
        description
      );
      return res.status(204).json(update);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao atualizar categoria: " + error });
    }
  }
}

export default CategoryController;
