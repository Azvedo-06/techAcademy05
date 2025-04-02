import UserService from "../src/services/userService";
const userService = new UserService();
import { validateUserPassword, validateUserEmail, validateUserCpf } from "../src/utils/funcoes";
import request  from "supertest";
import app from "../src/app";

describe('registrar usuário validação', ()  => {
    test('deve criar um user valido', async () => {        
        const nome = "adm";
        const email = "adm@gmail.com";
        const senha = "123456";
        const cpf = "114.364.369-07";
        
        const resultado = await userService.createUser(nome, email, senha, cpf);
    
        expect(resultado.name).toBe(nome);
        expect(resultado.email).toBe(email);
        expect(resultado.cpf).toBe(cpf);
    })
        
    test('não deve criar usuário com email inválido', async () => {
        const email = "mariagmail.com";  // Email inválido
        try {
            await validateUserEmail(email);
        } catch (error) {
            expect(error).toBe('email inválido');
        }
        
    })

    test('não deve criar usuário com senha menor que 6 caracteres', async () => {
        const senha = "12345";
        try {
            await validateUserPassword(senha);
        } catch (error) {
            expect(error).toBe("A senha deve ter pelo menos 6 caracteres")
        }
    })

    test('não deve criar usuário com senha cpf inválido', async () => {
        const cpfInvalido = "123.456.789-1"

        try {
            await validateUserCpf(cpfInvalido)
        } catch (error) {
            expect(error).toBe("cpf inválido")
        }
    })

    test('Validação para não permitir edição ou exclusão de recursos inexistentes.', async () => {
        const response = await request(app)
            .delete('/users')
            .send({
                id: 0,
            })
        expect(response.status).toBe(404)
    })

    test('Restrição para permitir apenas o login de usuários cadastrados.', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'adm@gmail.com',
                password: '123456'
            })
        expect(token.status).toBe(200)
    })

    // test('Todas as rotas dos CRUDs devem ser autenticadas.')
    // test('Restrição para permitir que o usuário edite apenas seus próprios dados.')
    // test('Restrição para impedir alteração do e-mail do usuário.')
})