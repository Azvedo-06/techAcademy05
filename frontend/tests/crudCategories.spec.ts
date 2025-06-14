import { test, expect } from '@playwright/test';

test.describe('Crud completa de categorias', () => {
    test('Deve realizar o fluxo completo de criar, editar, listar e excluir uma categoria de livro', async ({page}) => {
        // login
        page.goto('http://localhost:5173/login');

        await page.fill('#email', 'admin@gmail.com');
        await page.fill('#password', '123456');

        await page.getByRole("button", { name: "Entrar" }).click()
        await expect(page).toHaveURL('http://localhost:5173/');
        await page.getByRole("link", {name: "Categorias"} )

        // Criar uma categoria
        await page.goto('http://localhost:5173/categories');
        
        await page.fill('#name', 'Terror');
        await page.click('button[type="submit"]');
        
        // listar categorias
        await page.goto('http://localhost:5173/categories');
        await page.locator('h2.book-title', { hasText: 'Terror' });

        // Editar produto
        await page.locator('tr', { hasText: 'Terror' }).getByRole('button', { name: 'Editar' })  
        await page.fill('#name', 'Ficção');
        await page.click('button[type="submit"]');

        // Excluir categorias
        await expect(page.locator('h2.book-title:has-text("Ficção")')).toHaveText('Ficção');
       
        page.once('dialog', async dialog => {
            if (dialog.type() === 'confirm') {
            await dialog.accept(); // clicar em "OK"
        } else {
            await dialog.dismiss(); // se for outro tipo, cancelar
        }
        });

        await page.locator('h2.book-title:has-text("Ficção")').locator('..').getByRole('button', { name: 'Excluir' }).click()
        await expect(page.locator('h2.book-title:has-text("Ficção")')).toHaveCount(0);
    })

    test('Deve exibir erro ao tentar criar uma categoria com nome vazio', async ({page}) => {
        await page.goto('http://localhost:5173/login');

        await page.fill('#email', 'admin@gmail.com');
        await page.fill('#password', '123456');

        await page.getByRole("button", { name: "Entrar" }).click()
        await expect(page).toHaveURL('http://localhost:5173/');
        await page.getByRole("link", {name: "Categorias"} );

        await page.goto('http://localhost:5173/categories');
        await page.fill('#name', ' ');
        await page.click('button[type="submit"]');

        const required = await page.locator('#name');
        await expect(required).toHaveAttribute('required');
    })
})