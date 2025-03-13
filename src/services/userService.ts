import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

class UserService extends UserModel {
    public async validatePassword(password: string): Promise<Boolean> {
        return await bcrypt.compare(password, this.password!)
    }

    public async createUser(name: string, email: string, password: string, cpf: string): Promise<UserModel> {
        try {
            if (!name || name.trim() === "") {
                throw new Error("Nome é obrigatório");
            }
        
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !regex.test(email)) {
                throw new Error("email invalido");
            } 

            const cpfLimpo = cpf.replace(/\D/g, ''); // só deixa os numeros do cpf
            if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo) || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
                throw new Error("cpf invalido");
            }
    
            if (!password || password.length < 6) {
                throw new Error("A senha deve ter pelo menos 6 caracteres");
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

    public async deleteUser(id:number) {
        try {
            const userDelete = await UserModel.findByPk(id);

            if (!userDelete) {
                throw new Error("Usuário não encontrado");
            }

            await userDelete.destroy();
            return "Usuário deletado";
        } catch (error) {
            throw (`${error}`);
        }
    };

    public async getAllUser() {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            throw new Error("Erro ao buscar usuários. Tente novamente.");
        }
    }

    public async getUserById(id:number) {
        try {
            const userId = await UserModel.findByPk(id);
        
            if (!userId) {
                throw new Error("Usuário não existe");
            }

            return userId;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async updateUser(id:number, name: string, email: string, password: string, cpf: string) {
        try {
            const user = await UserModel.findByPk(id);
        
            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            if (!name || name.trim() === "") {
                throw new Error("Nome é obrigatório");
            }

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !regex.test(email)) {
                throw new Error("email invalido");
            }   

            const cpfLimpo = cpf.replace(/\D/g, ''); // só deixa os numeros do cpf
            if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo) || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
            throw new Error("cpf invalido");
            }

            if (!password || password.length < 6) {
                throw new Error("A senha deve ter pelo menos 6 caracteres");
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
            throw new Error(`Erro ao tentar atualizar usuário: ${error}`);
        }
    }
};

export default UserService;