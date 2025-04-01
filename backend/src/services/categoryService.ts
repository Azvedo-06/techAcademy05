import CategoryModel from "../models/CategoryModel";
import { validateCategoryExist, validateNameCategory } from "../utils/funcoes";
class categoryService extends CategoryModel{

    public async createCategory(name:string): Promise<CategoryModel> {
        try {
            const category = await CategoryModel.create({name});
            validateNameCategory(name);

            return category;
        } catch(error) {
            throw (`${error}`)
        }
    }

    public async deleteCategory(id:number): Promise<String> {
        try {
            const categoryDelete = await validateCategoryExist(id);

            await categoryDelete.destroy();

            return "Categoria Deletada";            
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

    public async updateCategory(id:number, name: string): Promise<CategoryModel> {
        try {
            const category = await validateCategoryExist(id);
            validateNameCategory(name);
    
            category.name = name;
         
            await category.save();
            return category;
        } catch(error) {
            throw (`${error}`);
        }
    }
}

export default categoryService;;