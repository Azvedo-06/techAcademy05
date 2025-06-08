import { test, expect } from '@playwright/test';

test('página inicial carrega corretamente', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  const title = await page.getByText("Bem-vindo de volta!")

  expect(title).toBeTruthy();
});