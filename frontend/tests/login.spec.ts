import { test, expect } from '@playwright/test';

test.describe('Pagina de Login', () => {
  test('Deve fazer login com sucesso, redireciona para a home(/books)', async ({page}) => {
    await page.goto('http://localhost:5173/login');
     
    await page.fill('#email', 'admin@gmail.com');
    await page.fill('#password', '123456');

    await page.getByRole("button", { name: "Entrar" }).click()

    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('Deve falhar ao tentar login com senha incorreta', async ({page}) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('#email', 'admin@gmail.com');
    await page.fill('#password', '517700');

    await page.getByRole("button", { name: "Entrar" }).click()

    await expect(page.locator('p.text-red-500')).toHaveText(/E-mail ou senha inválidos/);
  })

  // inputs vazios
  test('deve exibir mensagem de erro ao deixar campos vazios(required)', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.getByRole("button", {name: "Entrar"}).click();

    const emailInput = await page.locator('#email');
    await expect(emailInput).toHaveAttribute('required');
  });
})
