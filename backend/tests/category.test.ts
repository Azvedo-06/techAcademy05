import request from "supertest";
import app from "../src/app";
import { validateNameCategory } from "../src/utils/funcoes";

describe('Registrar Category validação', () => {
    // test('deve criar uma categoria validada, com token', async () => {
    //     const token = await request(app)
    //     .post('/login')
    //     .send({
    //         email: 'test@gmail.com',
    //         password: '123456'
    //     })
    //     expect(token.status).toBe(200)

    //     const response = await request(app)
    //     .post('/categorys')
    //     .set({authorization: token.body.token})
    //     .send({
    //         name: 'Fantasia'
    //     })
    //     expect(response.status).toBe(201)
    // })

    test('não deve criar uma categoria sem nome', async () => {
        const name = '';
        try {
            validateNameCategory(name);
        } catch (error) {
            expect(error).toBe('Nome da categoria obrigatório')
        }
    })
})

describe('Validação de CRUDs de Category', () => {
    test('DELETE, /categorys/id validação para não permitir edição ou exclusão de recursos inexistentes.', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app).delete('/categorys/0')
        .set({authorization: token.body.token})
        expect(response.status).toBe(500)
    })
    
    test('GET, /category deve retornar um erro ao tentar buscar todas as categorias sem o token', async () => {
        const response = await request(app).get('/categorys')
        expect(response.status).toBe(401)
    })

    test('GET, /category/1 buscar categoria por id com token deve retornar OK(200)', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .get('/categorys/1')
        .set({authorization: token.body.token})
        expect(response.status).toBe(200)
    })

    test('POST, /categorys criação de categoria sem token deve retornar um erro', async () => {
        const response = await request(app).post('/categorys')
        expect(response.status).toBe(401)
    })

    test('PUT, /categorys/id atualizar categoria sem token deve retorna um erro', async () => {
        const response = await request(app).put('/categorys/1')
        expect(response.status).toBe(401)
    })
})