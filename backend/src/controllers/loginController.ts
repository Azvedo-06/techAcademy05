import { Request, Response } from "express";
import { validatePassword } from "../utils/funcoes";
import UserService from "../services/userService";
import { generateToken } from "../utils/jwt";

class LoginUsers {
    public async loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({error: 'E-mail e senha são obrigatórios'})
        }
    
        const user = await UserService.findOne({where: {email}})

        if(!user) {
            return res.status(404).json({error: 'Usuário não encontrado'})
        }
        
        const isValidPassword = await validatePassword(password);
        if (!isValidPassword) {
            return res.status(400).json({error: 'E-mail ou senha inválidos'})
        }
        
        const token = generateToken(user)
        
        res.status(200).json({message: 'Login bem-sucedido', token})
    }
}

export default LoginUsers;
 