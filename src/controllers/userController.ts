import { Request, Response} from "express";
import UserModel from "../models/UserModel";

export const getAllUser = async (req:Request, res:Response) => {
    const usersFindAll = await UserModel.findAll();
    res.send(usersFindAll);
}

export const getUserById = async (req:Request<{id: number}>, res:Response) => {
    const user = await UserModel.findByPk(req.params.id);
    return res.json(user);
}

export const createUser = async (req:Request, res:Response) => {
    //destructing object
    const { name, email, password, cpf } = req.body;
    const user = await UserModel.create({name, email, password, cpf});
    return res.status(201).json(user);
}

//delete

//update