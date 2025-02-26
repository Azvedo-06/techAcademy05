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