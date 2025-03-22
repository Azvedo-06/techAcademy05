import UserModel from '../models/UserModel';
import bcrypt from "bcrypt";

class userService extends UserModel{
    userModel = new UserModel();
    public async validatePassword(password: string): Promise<Boolean> {
        return await bcrypt.compare(password, this.password!)
    }

    public async createUser(name: string, email: string, password: string, cpf: string): Promise<UserModel> {
        try {
            if (!name || name.trim() === "") {
                throw ("Nome é obrigatório");
            }
        
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !regex.test(email)) {
                throw ("email inválido");
            } 

            const cpfLimpo = cpf.replace(/\D/g, ''); // só deixa os numeros do cpf
            if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo) || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
                throw ("cpf inválido");
            }
    
            if (!password || password.length < 6) {
                throw ("A senha deve ter pelo menos 6 caracteres");
            }
    
            // Criptografando a senha
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Criando usuário no banco de dados
            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                cpf,
            });
    
            return user;
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async deleteUser(id:number): Promise<string> {
        try {
            const userDelete = await UserModel.findByPk(id);

            if (!userDelete) {
                throw ("Usuário não encontrado");
            }

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
            const userId = await UserModel.findByPk(id);
        
            if (!userId) {
                throw ("Usuário não existe");
            }

            return userId;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateUser(id:number, name: string, email: string, password: string, cpf: string): Promise<UserModel> {
        try {
            const user = await UserModel.findByPk(id);
        
            if (!user) {
                throw ("Usuário não encontrado");
            }

            if (!name || name.trim() === "") {
                throw ("Nome é obrigatório");
            }

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !regex.test(email)) {
                throw ("email invalido");
            }   

            const cpfLimpo = cpf.replace(/\D/g, ''); // só deixa os numeros do cpf
            if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo) || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
                throw ("cpf invalido");
            }

            if (!password || password.length < 6) {
                throw ("A senha deve ter pelo menos 6 caracteres");
            }

            // Criptografando a senha
            const hashedPassword = await bcrypt.hash(password, 10);

                user.name = name,
                user.email = email,
                user.password = hashedPassword,
                user.cpf = cpf;
            
            await user.save();
            return user;
        } catch (error) {
            throw (`${error}`);
        }
    }
};

export default userService;