import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
 
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);

  })
  test('Login with correct credentials', async ({ page }) => {
 
    const userId = 'tester12';
    const userPassword = '12345678';
    const expectedUserName = 'Jan Demobankowy';

 
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Login with incorrect credentials', async ({ page }) => {
  
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').fill('12345678');
    await page.getByTestId('error-login-id').click();
    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków'
    );
  });

  test('Unsuccessful login with too short password', async ({ page }) => {

    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('12345');
    await page.locator('#login_password_container label').click();
    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków'
    );
  });
});
