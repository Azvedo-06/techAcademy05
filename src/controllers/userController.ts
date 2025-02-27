import { Request, Response} from "express";
import UserModel from "../models/UserModel";
import { error } from "console";


export const getAllUser = async (req:Request, res:Response) => {
    const usersFindAll = await UserModel.findAll();
    res.send(usersFindAll);
}

export const getUserById = async (req:Request<{id: number}>, res:Response) => {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
        return res.status(400).json({error: "User not found"})
    }

    return res.json(user);
}

export const createUser = async (req:Request, res:Response) => {
    try {
        //destructing object
        const { name, email, password, cpf } = req.body;
        
        if (!name || name === "") {
            return res.status(400).json({error: "Name is required"});
        }
        
        const user = await UserModel.create({name, email, password, cpf});
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json('erro interno no servidor:'+ error);
    }
}
   
export const deleteUser = async (req:Request<{id: number}>, res:Response) => {
    try {
        const userDelete = await UserModel.findByPk(req.params.id);

        if (!userDelete) {
            return res.status(400).json({error: 'User not found'});
        }

        userDelete.destroy();
        return res.status(200).json("usuário deletado");

    } catch (error) {
        res.status(500).json('erro interno no servidor:'+ error);
    }
}

export const updateUser = async (req:Request<{id:string}>, res:Response) => {
    try {
        //destructing object
        const { name, email, password, cpf } = req.body;
        
        if (!name || name === "") {
            return res.status(400).json({error: "Name is required"});
        }

        const user = await UserModel.findByPk(req.params.id);

        if (!user) {
            return res.status(400).json({error: "User not found"});
        }

        user.name = name
        user.email = email
        user.password = password
        user.cpf = cpf

        await user.save()
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json('erro interno no servidor:'+ error);
    }
}

