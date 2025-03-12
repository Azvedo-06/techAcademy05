import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

export const createUser = async (name: string, email: string, password: string, cpf: string) => {
    try {
        if (!name || name.trim() === "") {
            throw new Error("Nome é obrigatório");
        }
    
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !regex.test(email)) {
            throw new Error("email invalido");
        } 

        const validarEmail = (email: string): string => {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (regex.test(email)) {
                return email;  // Email válido
            } else {
                throw new Error("email invalido");  // Email inválido
            }
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
            email: validarEmail(email),
            password: hashedPassword,
            cpf,
        });
    
        return user;
    } catch (error) {
        throw (`${error}`);
    }
};

export const deleteUser = async (id:number) => {
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

export const getAllUser = async() => {
    try {
        const users = await UserModel.findAll();
        return users;
    } catch (error) {
        throw new Error("Erro ao buscar usuários. Tente novamente.");
    }
}

export const getUserById = async (id:number) => {
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

export const updateUser = async (id:number, name: string, email: string, password: string, cpf: string) => {
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
