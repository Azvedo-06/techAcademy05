import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";
import {
  validateNamAll,
  validateUserEmail,
  validateUserCpf,
  validateUserPassword,
  validateUserHash,
  validateUserExist,
} from "../utils/funcoes";

class userService extends UserModel {
  public validatePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password!);
  }
  public async createUser(
    name: string,
    email: string,
    password: string,
    cpf: string
  ): Promise<UserModel> {
    try {
      // Verificar se o e-mail já está em uso
      const existingEmail = await UserModel.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("E-mail já está em uso.");
      }

      // Verificar se o CPF já está em uso
      const existingCpf = await UserModel.findOne({ where: { cpf } });
      if (existingCpf) {
        throw new Error("CPF já está em uso.");
      }

      // Validações
      if (!validateNamAll(name)) {
        throw new Error("O nome é obrigatório.");
      }
      validateUserEmail(email);
      validateUserPassword(password);
      validateUserCpf(cpf);

      // Criptografar a senha
      const hashedPassword = await validateUserHash(password);

      // Criar o usuário
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        cpf,
      });

      return user;
    } catch (error: any) {
      console.error(
        "Erro no serviço de criação de usuário:",
        error.message || error
      );
      throw new Error(error.message || "Erro ao criar usuário");
    }
  }

  public async deleteUser(id: number): Promise<void> {
    try {
      const userDelete = await validateUserExist(id);

      await userDelete.destroy();
    } catch (error) {
      throw `${error}`;
    }
  }

  public async findAllUser(): Promise<UserModel[]> {
    try {
      const users = await UserModel.findAll();

      return users;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async findUserById(id: number): Promise<UserModel> {
    try {
      const userId = await validateUserExist(id);

      return userId;
    } catch (error) {
      throw `${error}`;
    }
  }

  public async updateUser(
    id: number,
    name: string,
    email: string,
    password?: string
  ): Promise<UserModel> {
    try {
      const user = await validateUserExist(id);

      if (!validateNamAll(name)) {
        throw "nome é obrigatório";
      }
      validateUserEmail(email);

      user.name = name;
      user.email = email;

      if (password && password.length >= 6) {
        validateUserPassword(password);
        user.password = await validateUserHash(password);
      }

      await user.save();
      return user;
    } catch (error) {
      throw `${error}`;
    }
  }
}

export default userService;
