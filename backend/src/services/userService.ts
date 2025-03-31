import UserModel from '../models/UserModel';
import 
{validateUserName, validateUserEmail, validateUserCpf, validateUserPassword, validateUserHash, validateUserExist}
from '../utils/funcoes';

class userService extends UserModel{
    public async createUser(name: string, email: string, password: string, cpf: string): Promise<UserModel> {
        try {
            //funções de validação
            validateUserName(name);
            validateUserEmail(email);
            validateUserPassword(password);
            validateUserCpf(cpf);
            // Criptografando a senha
            const hashedPassword = await validateUserHash(password);
            // Criando usuário no banco de dados
            const user = await UserModel.create({name, email, password: hashedPassword, cpf,});
            return user;
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async deleteUser(id:number): Promise<string> {
        try {
            const userDelete = await validateUserExist(id)
            await userDelete.destroy();
            return "Usuário deletado";
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async findAllUser(): Promise<UserModel[]> {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async findUserById(id:number): Promise<UserModel> {
        try {
            const userId = await validateUserExist(id);
            return userId;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateUser(id:number, name: string, email: string, password: string, cpf: string): Promise<UserModel> {
        try {
            const user = await validateUserExist(id);
            const hashedPassword = await validateUserHash(password);
            validateUserName(name);
            validateUserEmail(email);
            validateUserCpf(cpf);
            validateUserPassword(password);
            // atualizando user
            user.name = name, user.email = email, user.password = hashedPassword, user.cpf = cpf;
            // salvando alterações
            await user.save();
            return user;
        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default userService;