import CategoryModel from "../models/CategoryModel";
import { validateNamAll } from "../utils/validateName";

class CategoryService {
  public async findAllCategory(): Promise<CategoryModel[]> {
    try {
      const categories = await CategoryModel.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  public async createCategory(
    name: string,
    description: string
  ): Promise<CategoryModel> {
    try {
      if (!validateNamAll(name)) {
        throw "Nome da categoria é obrigatório";
      }

      const newCategory = await CategoryModel.create({
        name,
        description,
      });

      return newCategory;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async deleteCategory(id: number): Promise<void> {
    try {
      await CategoryModel.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  public async findCategoryById(id: number): Promise<CategoryModel> {
    try {
      const category = await CategoryModel.findByPk(id);
      if (!category) {
        throw "Categoria não encontrada";
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  public async updateCategory(
    id: number,
    name: string,
    description: string
  ): Promise<[number]> {
    try {
      if (!validateNamAll(name)) {
        throw "Nome da categoria é obrigatório";
      }

      const update = await CategoryModel.update(
        {
          name,
          description,
        },
        { where: { id } }
      );
      return update;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
