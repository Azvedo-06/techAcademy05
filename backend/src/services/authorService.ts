import AuthorModel from "../models/AuthorModel";
import { validateNameUser, validateAuthorBio, validateAuthorExist, validateAuthorDate} from "../utils/funcoes";

class authorService extends AuthorModel {
    public async createAuthor(name: string, bio: string, birth: Date): Promise<AuthorModel> {
        try {
            validateNameUser(name);
            validateAuthorBio(bio);
            const birthDate = validateAuthorDate(birth);

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

    public async deleteAuthor(id:number): Promise<void> {
        try {
            const AuthorDelete = await validateAuthorExist(id);

            await AuthorDelete.destroy();
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
            const authorId = await validateAuthorExist(id);
            
            return authorId
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateAuthor(id: number, name: string, bio: string, birth: Date): Promise<void> {
        try {
            const author = await validateAuthorExist(id);
            validateNameUser(name);
            validateAuthorBio(bio);
            const authorBirth = validateAuthorDate(birth);
          
            author.name = name
            author.bio = bio
            author.birth = authorBirth

            await author.save();
        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default authorService;