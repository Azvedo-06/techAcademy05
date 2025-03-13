import { Request, Response} from "express";
import UserService  from '../services/userService'


// passado no serverUser com validações feitas lá

class userController {
    public async createUserController(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const { name, email, password, cpf } = req.body;
            const user = await userService.createUser(name, email, password, cpf);
            return res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            return res.status(400).json({error: "Erro ao criar usuário: " + error});
        }
    };

    public async deleteUserController(req:Request<{id:number}>, res: Response) {
        try {
            const userService = new UserService();
            const message = await userService.deleteUser(Number(req.params.id)); 
            return res.status(200).json({message});
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar deletar usuário: " + error});
        }
    };

    public async getAllUserController(req:Request, res:Response) {
        try {
            const userService = new UserService();
            const users = await userService.getAllUser();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({error: "Erro ao buscar usuários. Tente novamente: " + error});
        }
    };

    public async getUserByIdController(req:Request<{id:number}>, res:Response) {
        try {
            const userService = new UserService();
            const user = await userService.getUserById(Number(req.params.id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar encontrar Usuário: " + error});
        }
    }

    public async updateUserController(req:Request, res:Response) {
        try {
            const userService = new UserService();
            const {id} = req.params;
            const {name, email,password, cpf} = req.body;
        
            const update = await userService.updateUser(
                parseInt(id, 10),
                name,
                email,
                password,
                cpf
            );

            return res.status(201).json(update);
        } catch (error) {
            return res.status(400).json({error: "Erro ao tentar atualizar usuário: " + error});
        }
    }
};

export default userController;

/* create passdo direto no controller
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

export const getAllUser = async (req:Request, res:Response) => {
    const usersFindAll = await UserModel.findAll();
    res.json(usersFindAll);
}
*/

/*
export const getUserById = async (req:Request<{id: number}>, res:Response) => {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
        return res.status(400).json({error: "User not found"})
    }

    return res.json(user);
}
*/

/*
export const updateUser = async (req:Request<{id:string}>, res:Response) => {
    try {
        //destructing object
        const { name, email, password, cpf } = req.body;
        
        if (!name || name === "") {
            return res.status(400).json({error: "Name is required"});
        }

        const user = await UserModel.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({error: "User not found"});
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
};
*/