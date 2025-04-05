import bcrypt from "bcrypt";
import UserModel from '../models/UserModel';
import 
{ validateNamAll, validateUserEmail, validateUserCpf, validateUserPassword, validateUserHash, validateUserExist }
from '../utils/funcoes';

class userService extends UserModel{
    public validatePassword(password: string): Promise<Boolean> {
        return bcrypt.compare(password, this.password!)
    }
    public async createUser(name: string, email: string, password: string, cpf: string): Promise<UserModel> {
        try {
            if (!validateNamAll(name)) {
                throw 'nome é obrigatório'
            }
            validateUserEmail(email);
            validateUserPassword(password);
            validateUserCpf(cpf);

            const hashedPassword = await validateUserHash(password);

            const user = await UserModel.create({name, email, password: hashedPassword, cpf,});
            return user;
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async deleteUser(id:number): Promise<void> {
        try {
            const userDelete = await validateUserExist(id)

            await userDelete.destroy();
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

    public async updateUser(id:number, name: string, email: string, password: string, cpf: string): Promise<void> {
        try {
            const user = await validateUserExist(id);
            const hashedPassword = await validateUserHash(password);

            if (!validateNamAll(name)) {
                throw 'nome é obrigatório'
            }
            validateUserEmail(email);
            validateUserCpf(cpf);
            validateUserPassword(password);


            user.name = name, user.email = email, user.password = hashedPassword, user.cpf = cpf;
            await user.save();
        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default userService;