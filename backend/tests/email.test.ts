import UserService from "../src/services/userService";

const userService = new UserService();

describe('registrar usuário validação', ()  => {
    test('deve criar um user com email valido', async () => {
        const nome = "andre";
        const email = "andre@gmail.com";  // Email válido
        const senha = "123456";
        const cpf = "123.456.789-10";

        const resultado = await userService.createUser(nome, email, senha, cpf);
    
        expect(resultado.name).toBe(nome);
        expect(resultado.email).toBe(email);
        expect(resultado.cpf).toBe(cpf);
    })

    test('não deve criar usuário com email inválido', async () => {
        const nome = "Maria";
        const email = "mariagmail.com";  // Email inválido
        const senha = "543221";
        const cpf = "987.654.321-00";

        try {
            // Esperando que crie o usuário e lançe o erro
            await userService.createUser(nome, email, senha, cpf);
        } catch (erro) {
            expect(erro).toBe("email inválido");
        }
    })
})