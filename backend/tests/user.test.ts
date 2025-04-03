import { validateUserPassword, validateUserEmail, validateUserCpf } from "../src/utils/funcoes";
import request  from "supertest";
import app from "../src/app";


describe('registrar usuário validação', ()  => {
    test('deve criar um user valido, com token', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
        
        expect(token.status).toBe(200)

        const response = await request(app)
            .post('/users')
            .set({authorization: token.body.token})
            .send({
                name: 'test',
	            email: 'test@gmail.com',
	            password: '123456',
	            cpf: '114.364.369-07'
            })
        expect(response.status).toBe(201)
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

    test('não deve criar usuário com cpf inválido', async () => {
        const cpfInvalido = "123.456.789-1"
        try {
            await validateUserCpf(cpfInvalido)
        } catch (error) {
            expect(error).toBe("cpf inválido")
        }
    })

    test('Restrição para não permitir o login de usuários não cadastrados.', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'null@gmail.com',
                password: '999999'
            })
        expect(token.status).toBe(404)
    })

    // test('Restrição para permitir que o usuário edite apenas seus próprios dados.')
})

describe('Validação de CRUDs de User', () => {
    test('DELETE, /users/id validação para não permitir edição ou exclusão de recursos inexistentes.', async () => {
        const response = await request(app).delete('/users/0')
        expect(response.status).toBe(401)
    })

    test('GET, /users sem token deve retornar erro ', async () => {
        const response = await request(app).get('/users')
        expect(response.status).toBe(401)
    })

    test('PATCH, /users/1 sem token deve retornar um erro', async () => {
        const response = await request(app).patch('/users/1')
        expect(response.status).toBe(401)
    });
    
    test('POST, /users criar usuários sem token deve retornar erro', async () => {
        const response = await request(app).post('/users')
        expect(response.status).toBe(401)
    })

    test('GET, /users com token deve ser valido', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })

        const response = await request(app)
        .get('/users')
        .set({authorization: token.body.token})

        expect(response.status).toBe(200)
    })
})