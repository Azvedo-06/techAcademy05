import request from "supertest";
import app from "../src/app";
import { validateNamAll } from "../src/utils/funcoes";

describe('Registrar Category validação', () => {
    test('deve criar uma categoria validada, com token', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .post('/categorys')
        .set({authorization: token.body.token})
        .send({
            name: 'Fantasia'
        })
        expect(response.status).toBe(201)
    })

    test('não deve criar uma categoria sem nome', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .post('/categorys')
        .set({authorization: token.body.token})
        .send({
            name: ''
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('error','erro ao criar categoria: nome da categoria é obrigatório')
    })
})