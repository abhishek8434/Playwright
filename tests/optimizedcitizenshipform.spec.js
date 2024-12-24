const { test, expect, chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
import { login } from '../utils/helper';
import { generalFlow, uploadDocumentWithNameAndType, uploadDocumentsWithName } from '../utils/citizenshipform';

const screenshotDir = path.join(__dirname, '../Screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

test.describe('Apply For Citizenship', () => {
    let browser;
    let context;
    let page;

    test.beforeAll(async () => {
        // Setup browser and context manually
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        // Call the login function
        await login(page);

        // Continue with your test steps after login
        await page.locator('#defaultNavbar1').getByText('Citizenship', { exact: true }).click();
        await page.getByRole('link', { name: 'Apply For Citizenship' }).click();
        await page.getByRole('link', { name: 'Proceed' }).click();
        await page.getByRole('heading', { name: 'Personal Information' }).click();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.afterEach(async () => {
        // Reload page after each test to reset the state
        await page.reload();
    });
    //Leave all mandatory field blank
    test('TC 1: Leave all mandatory field blank', async () => {
        
        await page.getByRole('link', { name: 'Proceed' }).click();
        const errorMessageLocator = page.locator('text=Please complete all the required field(s).');
        await expect(errorMessageLocator).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(screenshotDir, 'screenshot-leaveallfieldemptycitizenship.png'), fullPage: true });
        await expect(errorMessageLocator).toHaveText('Please complete all the required field(s).');
        await page.getByRole('link', { name: 'Ok' }).click();

    });    
    
    test('TC 2: Negative Flow', async () => {
        await generalFlow(page)
        await uploadDocumentsWithName(page, 'Citizenship data', 'txt');
        await uploadDocumentWithNameAndType(page, 'Citizenship data', 'txt');
        //Proceed button click
        await page.getByRole('link', { name: 'Proceed' }).click();
        const isVisible = await page.getByText('Please complete all the required field(s).').isVisible();
        if (isVisible) {
            await page.getByRole('link', { name: 'Ok' }).click();
            console.log('Message')
        } else {
            console.log("The text is not visible.");
        }
        const validationMessage = 'Please upload file with png/jpeg/pdf/word format';
        await expect(page.getByText(validationMessage).first()).toBeVisible({ timeout: 5000 });
        // Get the full text content of the page
        const pageText = await page.textContent('body');
        // Count occurrences of the sentence
        const sentenceCount = (pageText.match(new RegExp(validationMessage, 'g')) || []).length;
        console.log(`The sentence "${validationMessage}" appears ${sentenceCount} times.`);
        // Take a full-page screenshot
        await page.screenshot({ path: path.join(screenshotDir, 'citizenship_invalid_file.png'), fullPage: true });
        console.log('Screenshot saved as citizenship_invalid_file.png');

    });
  
    test('TC 3: Positive Flow', async () => {
        
        await generalFlow(page);
        await uploadDocumentsWithName(page, 'Citizenship data', 'pdf');
        await uploadDocumentWithNameAndType(page, 'Citizenship data', 'pdf');
        //Proceed button click
        await page.getByRole('link', { name: 'Proceed' }).click();
        const isVisible = await page.getByText('You have successfully').isVisible();
        if (isVisible) {
            console.log('Success Message')
        } else {
            console.log("The text is not visible.");
        }
        //await page.getByRole('link', { name: 'Submit' }).click();
        // For payment
        // await page.getByLabel('The information provided').check();
        // await page.getByRole('button', { name: 'Proceed To Payment' }).click();
        // await page.getByRole('link', { name: 'Ok' }).click();

    });
});
