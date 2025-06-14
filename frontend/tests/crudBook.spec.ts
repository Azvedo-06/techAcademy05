import { test, expect } from '@playwright/test';

test.describe('Crud completa de books', () => {
    test('Deve realizar o fluxo completo de criar, editar, listar e excluir um livro', async ({page}) => {
        // login
        page.goto('http://localhost:5173/login');

        await page.fill('#email', 'admin@gmail.com');
        await page.fill('#password', '123456');

        await page.getByRole("button", { name: "Entrar" }).click()
        await expect(page).toHaveURL('http://localhost:5173/');

        // Criar um livro
        await page.fill('#title', 'test');
        await page.fill('#description', 'test');
        await page.fill('#publicationDate', '2000-10-10');
        await page.locator('#author').selectOption({ label: 'J. K. Rowling' });
        await page.selectOption('#category', 'Fantasia');
        await page.setInputFiles('#coverImage', 'public/alienista-290x315.jpg');
        await page.click('button[type="submit"]');
        
        // listar categorias
        await page.goto('http://localhost:5173/');
        await page.locator('h2.book-title', { hasText: 'test' });

        // Editar produto
        await page.locator('ts', { hasText: 'test' }).getByRole('button', { name: 'Editar' })  
        await page.fill('#title', 'Ficção');
        await page.click('button[type="submit"]');

        await expect(page.locator('h2.book-title:has-text("test")')).toHaveText('test');
       
        // Excluir produto
        page.once('dialog', async dialog => {
            if (dialog.type() === 'confirm') {
            await dialog.accept(); // clicar em "OK"
        } else {
            await dialog.dismiss(); // se for outro tipo, cancelar
        }
        });

        await page.locator('h2.book-title:has-text("test")').locator('..').getByRole('button', { name: 'Excluir' }).click()
        await expect(page.locator('h2.book-title:has-text("test")')).toHaveCount(0);
    })

    test('Deve exibir erro ao tentar criar um livro com nome vazio', async ({page}) => {
        await page.goto('http://localhost:5173/login');

        await page.fill('#email', 'admin@gmail.com');
        await page.fill('#password', '123456');

        await page.getByRole("button", { name: "Entrar" }).click()
        await expect(page).toHaveURL('http://localhost:5173/');

        await page.fill('#title', ' ');
        await page.click('button[type="submit"]');

        const required = await page.locator('#title');
        await expect(required).toHaveAttribute('required');
    })
})