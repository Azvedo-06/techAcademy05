import CategoryModel from "../models/CategoryModel";
import { validateCategoryExist, validateCategoryName } from "../utils/funcoes";
class categoryService extends CategoryModel{

    public async createCategory(name:string): Promise<CategoryModel> {
        try {
            validateCategoryName(name);
            const category = await CategoryModel.create({name});
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
            // funções de validação
            const category = await validateCategoryExist(id);
            validateCategoryName(name);
            // atualizando categoria
            category.name = name;
            // salvando 
            await category.save();
            return category;
        } catch(error) {
            throw (`${error}`);
        }
    }
}

export default categoryService;;