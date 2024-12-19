import { test, expect } from '@playwright/test';
import { setTimeout } from 'timers/promises';

test.describe('Pulpit tests', () => {
  const userId = 'tester12';
  const userPassword = '12345678';
    test.beforeEach(async ({ page }) => {
        const url = 'https://demo-bank.vercel.app/';
        await page.goto(url);

        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
    
      })
  test('Quick payment with correct data', async ({ page }) => {

    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'Zwrot środków';
    const expectedTransferReceiver = 'Chuck Demobankowy';


    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    await setTimeout(5000);
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN
       - ${transferTitle}`
    );
  });

  test('Phone top-up', async ({ page }) => {
  
    const expectedUserName = 'Jan Demobankowy';

    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('120');
    await page.locator('#widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await page
      .getByRole('link', { name: 'Doładowanie wykonane! 120,' })
      .click();
  });
});
