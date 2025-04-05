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
                name: 'adm2',
	            email: 'test2@gmail.com',
	            password: '654321',
	            cpf: '114.364.369-07'
            })
        expect(response.status).toBe(201)
    })
    
    test('não deve criar usuário com senha menor que 6 caracteres', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })

        const response = await request(app)
        .post('/users')
        .set({authorization: token.body.token})
        .send({
            name: 'adm2',
	        email: 'test2@gmail.com',
	        password: '654',
	        cpf: '114.364.369-07'
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('error','erro ao criar usuário: A senha deve ter pelo menos 6 caracteres')
    })

    test('não deve criar usuário com cpf errado', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })

        const response = await request(app)
        .post('/users')
        .set({authorization: token.body.token})
        .send({
            name: 'adm2',
	        email: 'test2@gmail.com',
	        password: '654321',
	        cpf: '114.364.369-08'
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('error','erro ao criar usuário: Error: CPF inválido')
    })

    test('não deve criar usuário com email inválido', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })

        const response = await request(app)
        .post('/users')
        .set({authorization: token.body.token})
        .send({
            name: 'adm2',
	        email: 'test2gmail.com',
	        password: '654321',
	        cpf: '114.364.369-07'
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('error','erro ao criar usuário: email inválido')

    })

    // colocar essa num test login
    test('Restrição para não permitir o login de usuários não cadastrados.', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'null@gmail.com',
                password: '999999'
            })
        expect(token.status).toBe(404)
    })

    test('Restrição para não permitir deletar dados inexistente.', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
        expect(token.status).toBe(200)

        const response = await request(app)
        .delete('/users/0')
        .set({authorization: token.body.token})

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("error","erro ao tentar deletar usuário: Usuário não encontrado")
    })
    // test('Restrição para permitir que o usuário edite apenas seus próprios dados.')
})