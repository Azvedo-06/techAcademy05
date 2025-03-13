import AuthorModel from "../models/AuthorModel";

class authorService extends AuthorModel {
    public async createAuthor(name: string, bio: string, birth: Date) {
        try {
            if (!name || name.trim() === "") {
                throw new Error('Nome é obrigatório');
            }

            if (!bio || bio.trim() === "") {
                throw new Error("Bio é obrigatório");
            }

            // Validação da data de nascimento (verifica se é uma instância de Date válida)
            const birthDate = new Date(birth);
            if (isNaN(birthDate.getTime())) {
                throw new Error("Data de nascimento inválida");
            }

            const newAuthor = await AuthorModel.create({
                name,
                bio,
                birth: birthDate
            });

            return newAuthor
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async deleteAuthor(id:number) {
        try {
            const AuthorDelete = await AuthorModel.findByPk(id);

            if (!AuthorDelete) {
                throw new Error("Autor não encontrado");
            }

            await AuthorDelete.destroy();
            return "Autor deletado";
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async getAll() {
        try {
            const authors = await AuthorModel.findAll();
            return authors
        } catch (error) {
            throw Error("Erro ao buscar autores. Tente novamente.")
        }
    }

    public async getById(id:number) {
        try {
            const authorId = await AuthorModel.findByPk(id);
            
            if (!authorId) {
                throw Error("Erro ao buscar autor");
            }

            return authorId
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateAuthor(id: number, name: string, bio: string, birth: Date) {
        try {
            const author = await AuthorModel.findByPk(id);

            if(!author) {
                throw Error("Erro ao buscar autor");
            }

            if (!name || name.trim() === "") {
                throw new Error('Nome é obrigatório');
            }

            if (!bio || bio.trim() === "") {
                throw new Error("Bio é obrigatório");
            }

            // Validação da data de nascimento (verifica se é uma instância de Date válida)
            if (!(birth instanceof Date) || isNaN(birth.getTime())) {
                throw new Error("Data de nascimento inválida");
            }

            author.name = name
            author.bio = bio
            author.birth = birth

            await author.save();
            return author;

        } catch (error) {
            throw new Error(`Erro ao tentar atualizar usuário: ${error}`);
        }
    }
};

export default authorService;