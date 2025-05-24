import { Request, Response } from "express";
import UserService from "../services/userService";

const userService = new UserService();

class userController {
  public async createUserController(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { name, email, password, cpf } = req.body;
      const user = await userService.createUser(name, email, password, cpf);

      return res.status(201).json(user);
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error.message || error);
      return res
        .status(400)
        .json({ error: error.message || "Erro ao criar usuário" });
    }
  }

  public async deleteUserController(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> {
    try {
      const userDelete = await userService.deleteUser(Number(req.params.id));
      return res.status(200).json(userDelete);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao tentar deletar usuário: " + error });
    }
  }

  public async findAllUserController(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const users = await userService.findAllUser();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao buscar usuários. Tente novamente: " + error });
    }
  }

  public async findUserByIdController(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await userService.findUserById(Number(req.params.id));

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao tentar encontrar Usuário: " + error });
    }
  }

  public async updateUserController(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updatedUser = await userService.updateUser(
        parseInt(id, 10),
        name,
        email,
        password // pode ser undefined ou ""
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "erro ao tentar atualizar usuário: " + error });
    }
  }
}

export default userController;
