import CategoryModel from "../models/CategoryModel";

class categoryService extends CategoryModel{

    public async createCategory(name:string): Promise<CategoryModel> {
        try {
            if (!name || name.trim() === "") {
                throw new Error("Nome da categoria é obrigatório");
            }
            const category = await CategoryModel.create({
                name
            });

            return category;
        } catch(error) {
            throw (`${error}`)
        }
    }

    public async deleteCategory(id:number): Promise<String> {
        try {
            const categoryDelete = await CategoryModel.findByPk(id);
            
            if (!categoryDelete) {
                throw Error("Categoria não encontrada");
            }

            await CategoryModel.destroy();
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
            throw new Error("Erro ao buscar usuários. Tente novamente.");
        }
    }

    public async findCategoryById(id:number): Promise<CategoryModel> {
        try {
            const categoryId = await CategoryModel.findByPk(id);
        
            if (!categoryId) {
                throw new Error("Categoria não existe");
            }

            return categoryId;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateCategory(id:number, name: string): Promise<CategoryModel> {
        try {
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                throw new Error("Categoria não encontrado");
            }

            if (!name || name.trim() === "") {
                throw new Error("Nome da categoria é obrigatório");
            }

            category.name = name;

            await category.save();
            return category;

        } catch(error) {
            throw new Error(`Erro ao tentar atualizar categoria: ${error}`);
        }
    }
}

export default categoryService;;