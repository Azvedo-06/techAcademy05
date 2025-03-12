import e from "express";
import { createUser } from "../src/services/userServices";

describe('Email validação', () => {
    test('email é valido', () => {
        const nome = "andre";
        const email = "andre@gmail.com";  // Email válido
        const senha = "123456";
        const cpf = "123.456.789-10";

        const resultado = createUser(nome, email, senha, cpf);
        expect(resultado).toBe("Usuário andre criado com sucesso")
    })

    test('não deve criar usuário com email inválido', () => {
        const nome = "Maria";
        const email = "mariagmail.com";  // Email inválido
        const senha = "543221";
        const cpf = "987.654.321-00";

        const resultado = createUser(nome, email, senha, cpf);
        expect(resultado).toBe("Email inválido");  // Espera-se que a função retorne "Email inválido"
    })
})