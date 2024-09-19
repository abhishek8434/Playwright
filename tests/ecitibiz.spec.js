const { test, expect } = require('@playwright/test');
//import { locators } from '../constants/const.js';
const formData = {
  firstName: 'William',
  lastName: 'Headwick',
  phone: '+2348153353177',
  address: 'Nigeria',
  email: 'invalid-email',
  password: 'Password1',
  confirmPassword: 'Password1',
  securityAnswer: 'Black'
};

function generateRandomEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  let domain = 'yopmail';
  for (let i = 0; i < 8; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${username}@${domain}.com`;
}

test.describe('Form Submission Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the registration page
    await page.goto('https://ecitibiz.evdpl.com/account/Register/', { waitUntil: 'networkidle' }); // Ensure the page is fully loaded

    // Navigate through the steps to the registration form
    await page.getByRole('tab', { name: 'Personal' }).click();
    await page.getByRole('button', { name: 'Personal Account (Marriage)' }).click();
    await page.getByRole('link', { name: 'Register Now' }).click();
  });

  /**
   * Negative Test Cases
   */

  test('Negative Test 1: Leave mandatory fields blank', async ({ page }) => {
    // Click the 'Register' button without filling any form fields
    //   await page.click('xpath=//*[@id="btnSubmitPersonalAccount"]')
    await page.waitForSelector('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')
    await page.click('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')
    await page.waitForTimeout(5000);
    await page.click('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')

    // Wait for error messages to appear on the screen (Adding explicit waits)
    await page.waitForSelector('text=First Name is Required');

    // Assert that all required field error messages are visible on the screen
    expect(await page.getByText(/First Name is Required/i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Last Name is Required/i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Gender is Required/i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Address is Required/i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Email is Required/i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Security Question is Required./i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Answer is Required./i).isVisible()).toBeTruthy();
    expect(await page.getByText(/Please Agree Terms of Use/i).isVisible()).toBeTruthy();

    // Take a screenshot before submission (optional for debugging)
    await page.screenshot({ path: 'screenshot-leave-blank.png', fullPage: true });
  });

  test('Negative Test 2: Invalid email format', async ({ page }) => {
    // Fill the form with invalid email
    await page.getByLabel('* First Name').fill(formData.firstName);
    await page.getByLabel('* Last Name').fill(formData.lastName);
    await page.getByLabel('* Phone Number').fill(formData.phone);
    await page.getByLabel('* Email Address').fill('invalid-email'); // Invalid email
    await page.getByLabel('* Password').fill(formData.password);
    await page.getByLabel('* Confirm Password').fill(formData.confirmPassword);
    await page.locator('#ddlQuestionId').selectOption('2');
    await page.getByLabel('* Answer').fill(formData.securityAnswer);
    await page.locator('input#AgreeTermsOfUse').check(); // Agree to terms

    // Take a screenshot before submission (optional for debugging)
    await page.screenshot({ path: 'screenshot-invalid-email.png', fullPage: true });

    await page.waitForSelector('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')
    await page.click('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')

    // Wait for the "Invalid Email Address" message to appear
    await page.waitForSelector('text=Invalid Email Address', { timeout: 5000 });

    // Assert that the "Invalid Email Address" message is visible
    expect(await page.getByText('Invalid Email Address').isVisible()).toBeTruthy();
  });

  test('Negative Test 3: Password mismatch', async ({ page }) => {
    // Fill the form with mismatching passwords
    await page.getByLabel('* First Name').fill(formData.firstName);
    await page.getByLabel('* Last Name').fill(formData.lastName);
    await page.getByLabel('* Phone Number').fill(formData.phone);
    await page.getByLabel('* Email Address').fill(formData.email);
    await page.getByLabel('* Password').fill('Password1');
    await page.getByLabel('* Confirm Password').fill('Password2'); // Mismatch password
    await page.locator('#ddlQuestionId').selectOption('2');
    await page.getByLabel('* Answer').fill(formData.securityAnswer);
    await page.locator('input#AgreeTermsOfUse').check(); // Agree to terms

    // Take a screenshot before submission
    await page.screenshot({ path: 'screenshot-password-mismatch.png', fullPage: true });

    await page.waitForSelector('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')
    await page.click('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')
    await page.waitForTimeout(5000);

    // Wait for the error message related to password mismatch
    await page.waitForSelector('text=Password and Confirmation', { timeout: 5000 });

    // Assert that the "Password and Confirmation" message is visible on the screen
    expect(await page.getByText('Password and Confirmation').isVisible()).toBeTruthy();
  });

  /**
   * Positive Test Case
   */

  test('Positive Test: Successful registration', async ({ page }) => {
    // Fill the form with valid data
    await page.getByLabel('* First Name').fill(formData.firstName);
    await page.getByLabel('* Last Name').fill(formData.lastName);
    await page.getByLabel('Male', { exact: true }).check();
    await page.getByLabel('* Phone Number').fill(formData.phone);
    await page.getByLabel('* Address').fill(formData.address);
    await page.getByLabel('* Email Address').fill(generateRandomEmail()); // Valid email
    await page.getByLabel('* Password').fill(formData.password);
    await page.getByLabel('* Confirm Password').fill(formData.confirmPassword);
    await page.locator('#ddlQuestionId').selectOption('2');
    await page.getByLabel('* Answer').fill(formData.securityAnswer);
    await page.locator('input#AgreeTermsOfUse').check();  // Agree to terms

    // Take a screenshot before form submission
    await page.screenshot({ path: 'screenshot-register.png', fullPage: true });

    // Capture the start time
    const startTime = Date.now();
    await page.waitForSelector('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')
    await page.click('xpath=/html/body/div[5]/div/div[2]/div/form/p/span[1]/input')


    // Confirm registration
    await page.getByRole('button', { name: 'Proceed' }).waitFor()
    await page.getByRole('button', { name: 'Proceed' }).click();

    // Wait for success message
    await page.waitForSelector('text=Congratulations', { timeout: 60000 });
    const successMessage = await page.locator('text=Congratulations').textContent();

    const endTime = Date.now();
    console.log('Form submitted successfully in', endTime - startTime, 'ms');

    // Assert that the success message is correct
    expect(successMessage).toContain('Congratulations! Your account has been created successfully.');
    // Take a screenshot before form submission
    await page.screenshot({ path: 'screenshot-success-message.png', fullPage: true });
  });
});
