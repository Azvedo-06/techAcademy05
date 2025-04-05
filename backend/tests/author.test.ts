import request from 'supertest';
import app from '../src/app';
import { validateAuthorBio, validateAuthorDate, validateNamAll } from '../src/utils/funcoes';

describe('Registrar Author validação', () => {
    test('deve criar um author valido com token', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .post('/authors')
        .set({authorization: token.body.token})
        .send({
            name: 'Joanne Rowling',
            bio: 'mais conhecida como J. K. Rowling, é uma escritora, roteirista e produtora cinematográfica britânica, notória por escrever a série de livros Harry Potter.',
            birth: '1965-07-31'
        })
        expect(response.status).toBe(201)
    })

    test('não deve criar um autor com nome invalido', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .post('/authors')
        .set({authorization: token.body.token})
        .send({
            name: '',
            bio: 'mais conhecida como J. K. Rowling, é uma escritora, roteirista e produtora cinematográfica britânica, notória por escrever a série de livros Harry Potter.',
            birth: '1965-07-31'
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("error","erro ao criar autor: nome do autor é obrigatório")
    })

    test('não deve criar um author com data errada', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .post('/authors')
        .set({authorization: token.body.token})
        .send({
            name: 'Joanne Rowling',
            bio: 'mais conhecida como J. K. Rowling, é uma escritora, roteirista e produtora cinematográfica britânica, notória por escrever a série de livros Harry Potter.',
            birth: '1965-07-99'
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("error","erro ao criar autor: Data de nascimento inválida")
    })

    test('não deve criar um author sem bio', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200)

        const response = await request(app)
        .post('/authors')
        .set({authorization: token.body.token})
        .send({
            name: 'Joanne Rowling',
            bio: '',
            birth: '1965-07-31'
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("error","erro ao criar autor: Bio é obrigatório")
    })
})