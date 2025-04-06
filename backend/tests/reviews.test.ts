import request from "supertest";
import app from "../src/app";

describe('registrar reviews validação', ()  => {
    test('deve criar um reviews valido, com token', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
        expect(token.status).toBe(200)
        
        const response = await request(app)
        .post('/reviews')
        .set({authorization: token.body.token})
        .send({
            comments: 'Livro muito bom',
	        nota: 10,
	        userId: 1,
	        BookId: 1
        })
        expect(response.status).toBe(201)
    })

    test('não deve criar um reviews sem comentário', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
        expect(token.status).toBe(200)
        
        const response = await request(app)
        .post('/reviews')
        .set({authorization: token.body.token})
        .send({
            comments: '',
	        nota: '10',
	        userId: 1,
	        BookId: 1
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("error","erro ao tentar criar comentário: Comentarios é obrigatório")
    })

    test('não deve criar um reviews sem nota', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
        expect(token.status).toBe(200)
        
        const response = await request(app)
        .post('/reviews')
        .set({authorization: token.body.token})
        .send({
            comments: 'Livro muito bom',
	        nota: '',
	        userId: 1,
	        BookId: 1
        })
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("error","erro ao tentar criar comentário: Nota é obrigatório")
    })
})