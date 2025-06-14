import { test, expect } from '@playwright/test';

test.describe('Pagina de Registrar-se', () => {
    test('Deve criar um registro de usuario com sucesso', async ({page}) => {
        await page.goto('http://localhost:5173/register');

        await page.fill('#name', 'admin2');
        await page.fill('#email', 'admin2@gmail.com');
        await page.fill('#password', '123456');
        await page.fill('#cpf', '189.708.290-83'); // cpf aleatorio

        await page.click('button[type="submit"]');

        await expect(page.locator('p.success-message')).toHaveText(/Cadastro realizado com sucesso! Redirecionando para login.../);
    })

    test('Deve falhar ao criar usuario com um cpf que já está em uso', async ({page}) => {
        await page.goto('http://localhost:5173/register');

        await page.fill('#name', 'andre');
        await page.fill('#email', 'andre@gmail.com');
        await page.fill('#password', '517702');
        await page.fill('#cpf', '114.364.369-07'); // cpf já em uso

        await page.click('button[type="submit"]');

        await expect(page.locator('p.error-message')).toHaveText(/CPF já está em uso./);
    })
})