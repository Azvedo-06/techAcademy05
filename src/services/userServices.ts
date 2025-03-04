import e from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

export const createUser = async (name: string, email: string, password: string, cpf: string) => {
    if (!name || name.trim() === "") {
        throw new Error("Name is required");
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email");
        
    }

    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
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
};

export const deleteUser = async (id:number) => {
    try {
        const userDelete = await UserModel.findByPk(id);

        if (!userDelete) {
            throw new Error("User not found");
        }

        await userDelete.destroy();
        return "Usuário deletado";
    } catch (error) {
        throw new Error(`Erro ao tentar deletar usuário: ${error}`);
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
            throw new Error("User not found");
        }

        return userId;
    } catch (error) {
        throw new Error(`Erro ao tentar encontrar usuário: ${error}`);
    }
}

export const updateUser = async (id:number, name: string, email: string, password: string, cpf: string) => {
    try {
        const user = await UserModel.findByPk(id);
        
        if (!user) {
            throw new Error("User not found");
        }

        if (!name || name.trim() === "") {
            throw new Error("Name is required");
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Invalid email");
        }   

        if (!password || password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
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