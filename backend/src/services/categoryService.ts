import CategoryModel from "../models/CategoryModel";
import { validateCategoryExist, validateNamAll } from "../utils/funcoes";
class categoryService extends CategoryModel{

    public async createCategory(name:string): Promise<CategoryModel> {
        try {
            const category = await CategoryModel.create({name});
            if (!validateNamAll(name)) {
                throw 'nome da categoria é obrigatório'
            }

            return category;
        } catch(error) {
            throw (`${error}`)
        }
    }

    public async deleteCategory(id:number): Promise<void> {
        try {
            const categoryDelete = await validateCategoryExist(id);

            await categoryDelete.destroy();

        } catch (error) {
            throw (`${error}`);
        }
    }

    public async findAllCategory(): Promise<CategoryModel[]> {
        try {
            const categorys = await CategoryModel.findAll();

            return categorys;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async findCategoryById(id:number): Promise<CategoryModel> {
        try {
            const categoryId = await validateCategoryExist(id);

            return categoryId;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateCategory(id:number, name: string): Promise<void> {
        try {
            const category = await validateCategoryExist(id);
            if (!validateNamAll(name)) {
                throw 'nome da categoria é obrigatório'
            }
    
            category.name = name;
            await category.save();
        } catch(error) {
            throw (`${error}`);
        }
    }
}

export default categoryService;;