import request  from "supertest";
import app from "../src/app";

describe('registrar book validação', ()  => {
    test('deve criar um book valido, com token', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200);

        const response = await request(app)
        .post('/books')
        .set({authorization: token.body.token})
        .send({
            title: 'Harry Potter e a Pedra Filosofal',
            description: 'Harry Potter and the Philosophers Stone o primeiro dos sete livros da série de fantasia Harry Potter, escrita por J. K. Rowling. O livro conta a história de Harry Potter, um órfão criado pelos tios que descobre, em seu décimo primeiro aniversário, que é um bruxo.',
            publication_date: '1997-06-26',
            authorId: 2,
            categoryId: 1
        })
        expect(response.status).toBe(201);
    })

    test('não deve criar um book sem title', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200);

        const response = await request(app)
        .post('/books')
        .set({authorization: token.body.token})
        .send({
            title: '',
            description: 'Harry Potter and the Philosophers Stone o primeiro dos sete livros da série de fantasia Harry Potter',
            publication_date: '1997-06-26',
            authorId: 2,
            categoryId: 1
        })
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error','erro ao criar o livro: Titulo do livro é obrigatório')
    })

    test('não deve criar um book sem descrição', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200);

        const response = await request(app)
        .post('/books')
        .set({authorization: token.body.token})
        .send({
            title: 'Harry Potter',
            description: '',
            publication_date: '1997-06-26',
            authorId: 2,
            categoryId: 1
        })
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error','erro ao criar o livro: Descrição é obrigatório')
    })

    test('não deve criar um book com data inválida', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(token.status).toBe(200);

        const response = await request(app)
        .post('/books')
        .set({authorization: token.body.token})
        .send({
            title: 'Harry Potter',
            description: 'Harry Potter and the Philosophers Stone o primeiro dos sete livros da série de fantasia Harry Potter',
            publication_date: '1997-06-99',
            authorId: 2,
            categoryId: 1
        })
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error','erro ao criar o livro: Data de publicação inválida')
    })
})