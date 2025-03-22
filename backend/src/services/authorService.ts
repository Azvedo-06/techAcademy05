import AuthorModel from "../models/AuthorModel";

class authorService extends AuthorModel {
    public async createAuthor(name: string, bio: string, birth: Date): Promise<AuthorModel> {
        try {
            if (!name || name.trim() === "") {
                throw ('Nome é obrigatório');
            }

            if (!bio || bio.trim() === "") {
                throw ("Bio é obrigatório");
            }

            // Validação da data de nascimento (verifica se é uma instância de Date válida)
            const birthDate = new Date(birth);
            if (isNaN(birthDate.getTime())) {
                throw ("Data de nascimento inválida");
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

    public async deleteAuthor(id:number): Promise<string> {
        try {
            const AuthorDelete = await AuthorModel.findByPk(id);

            if (!AuthorDelete) {
                throw ("Autor não encontrado");
            }

            await AuthorDelete.destroy();
            return "Autor deletado";
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async findAllAuthor(): Promise<AuthorModel[]> {
        try {
            const authors = await AuthorModel.findAll();
            return authors
        } catch (error) {
            throw (`${error}`)
        }
    }

    public async findAuthorById(id:number): Promise<AuthorModel> {
        try {
            const authorId = await AuthorModel.findByPk(id);
            
            if (!authorId) {
                throw ("Erro ao buscar autor");
            }

            return authorId
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateAuthor(id: number, name: string, bio: string, birth: Date): Promise<AuthorModel> {
        try {
            const author = await AuthorModel.findByPk(id);

            if(!author) {
                throw ("Erro ao buscar autor");
            }

            if (!name || name.trim() === "") {
                throw ('Nome é obrigatório');
            }

            if (!bio || bio.trim() === "") {
                throw ("Bio é obrigatório");
            }

            // Validação da data de nascimento (verifica se é uma instância de Date válida)
            if (!(birth instanceof Date) || isNaN(birth.getTime())) {
                throw ("Data de nascimento inválida");
            }

            author.name = name
            author.bio = bio
            author.birth = birth

            await author.save();
            return author;

        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default authorService;