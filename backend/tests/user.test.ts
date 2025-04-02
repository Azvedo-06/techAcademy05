import UserService from "../src/services/userService";
const userService = new UserService();
import request  from "supertest";
import app from "../src/app";

describe('registrar usuário validação', ()  => {
    test('deve criar um user valido', async () => {
        const nome = "andre";
        const email = "andre@gmail.com";
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
        const cpf = "987.654.321-10";

        try {
            // Esperando que crie o usuário e lançe o erro
            await userService.createUser(nome, email, senha, cpf);
        } catch (erro) {
            expect(erro).toBe("email inválido");
        }
    })

    test('não deve criar usuário com senha menor que 6 caracteres', async () => {
        const senha = "12345";

        try {
            await userService.createUser("adm2", "adm2@gmail.com", senha, "123.456.789-00")
        } catch (error) {
            expect(error).toBe("A senha deve ter pelo menos 6 caracteres")
        }
    })

    test('não deve criar usuário com senha cpf inválido', async () => {
        const cpfInvalido = "123.456.789-1"

        try {
            await userService.createUser("adm2", "adm2@gmail.com", "123456", cpfInvalido)
        } catch (error) {
            expect(error).toBe("cpf inválido")
        }
    })

    test('Restrição para permitir apenas o login de usuários cadastrados.', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'andre@gmail.com',
                password: '123456'
            })
        expect(response.status).toBe(200)
    })
})