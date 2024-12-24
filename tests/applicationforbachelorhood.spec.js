//git
const { test, expect, chromium, firefox, webkit } = require('@playwright/test');

import { citizenshipbachelorhood } from '../constants/locators';
import { generateNigerianPhoneNumber, getRandomNumber, initiateScript } from '../utils/helper';

const path = require('path');
const fs = require('fs');
import { faker } from '@faker-js/faker';

// Generate a random first name, last name, and combine them in an email
const email = faker.internet.email({ provider: 'yopmail.com' });
const phone = generateNigerianPhoneNumber();

const screenshotDir = path.join(__dirname, '../Screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

async function uploadDocument(page, file) {
    await page.locator('li').filter({ hasText: '* Upload Formal Application' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload passport photo of Husband Upload Upload Cancel' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload passport photo of Wife Upload Upload Cancel' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Affidavit of non-' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Birth Certificate or' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Certificate of State' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Notarized letter' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Nigerian' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Spouse means of' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Notarized consent' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Couples full length' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Full length photo of' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Marriage document of' }).getByRole('textbox').setInputFiles(file);
    await page.locator('li').filter({ hasText: '* Upload Proof of Address eg' }).getByRole('textbox').setInputFiles(file);
    await page.type(citizenshipbachelorhood.necessaryDocumentName, 'Test');
    await page.setInputFiles(citizenshipbachelorhood.necessaryDocument, file);
}

test.describe.configure({ mode: 'serial' });
test.describe('Apply For Citizenship', () => {
    let browser;
    let context;
    let page;

    test.beforeAll(async () => {
        // Setup browser and context manually
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        await initiateScript(page);
        console.log("Function")
        await page.locator('#defaultNavbar1').getByText('Citizenship', { exact: true }).click();
        await page.getByRole('link', { name: 'Apply For Attestation Of Bachelorhood/Spinsterhood' }).click();

        // const title = await page.title();
        // console.log(`The page title is: ${title}`);
        await expect(page).toHaveTitle('Application for Attestation of Bachelorhood/Spinsterhood');
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
        //await navigateToCitizenshipForm(page);

        await page.getByRole('link', { name: 'Proceed' }).click();
        const errorMessageLocator = page.locator('text=Please complete all the required field(s).');
        await expect(errorMessageLocator).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(screenshotDir, 'citizenshipbyrocleaveallfieldempty.png'), fullPage: true });
        console.log('Screenshot saved as citizenshipbyrocleaveallfieldempty.png');
        await expect(errorMessageLocator).toHaveText('Please complete all the required field(s).');

        await page.getByRole('link', { name: 'Ok' }).click();

    });

    //Invalid file type
    test('TC 2: Invalid file type', async () => {
        const option = ['1', '2'];

        // Pick a random option from the array
        const randomOption = option[getRandomNumber(0, option.length-1)];
        // Select the randomly chosen option
        await page.locator(citizenshipbachelorhood.SpouseDetails).selectOption(randomOption);

        // Fetch the visible text of the selected option
        // const selectedText = await page.$eval(
        //     `${citizenshipbachelorhood.SpouseDetails} option[value="${randomOption}"]`,
        //     option => option.textContent.trim()
        //     );

        // console.log(`Randomly selected option: ${randomOption}`);
        // console.log(`Visible text for selected option: ${selectedText}`);

        await page.type(citizenshipbachelorhood.ForeignAddress, 'Test Address');
        await page.selectOption(citizenshipbachelorhood.PlaceOfBirthCountry, '161');
        await page.click(citizenshipbachelorhood.PlaceOfBirthCountry);
        await page.keyboard.press('Escape');
        await page.selectOption(citizenshipbachelorhood.PlaceOfBirthState, '24')

        await page.locator('#ForeignCity').click();
        await page.locator('#ForeignCity').fill('test');

        await page.locator('li').filter({ hasText: 'Upload Identity Card Issued' }).getByRole('textbox').setInputFiles('invalid-file.txt');

        await page.getByRole('heading', { name: 'REASON(s) for application' }).click();
        await page.type(citizenshipbachelorhood.ReasonOfApplication, 'Reason');

        await page.getByRole('heading', { name: 'foreign spouse information' }).click();
        await page.type(citizenshipbachelorhood.ForeignSpouseEmail, email);
        await page.type(citizenshipbachelorhood.ForeignSpousePhoneNumber, phone);

        await page.getByRole('heading', { name: 'Documents Upload' }).click();
        await uploadDocument(page,'invalid-file.txt')

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
        await page.screenshot({ path: path.join(screenshotDir, 'applicationforbachelorhood_invalid_file.png'), fullPage: true });
        console.log('Screenshot saved as applicationforbachelorhood_invalid_file.png');

    });

    //positive flow
    test('TC 3: all mandatory field ', async () => {
        const option = ['1', '2'];

        // Pick a random option from the array
        const randomOption = option[getRandomNumber(0, option.length-1)];

        // Select the randomly chosen option
        await page.locator(citizenshipbachelorhood.SpouseDetails).selectOption(randomOption);

        // Fetch the visible text of the selected option
        const selectedText = await page.$eval(
            `${citizenshipbachelorhood.SpouseDetails} option[value="${randomOption}"]`,
            option => option.textContent.trim()
        );

        console.log(`Randomly selected option: ${randomOption}`);
        console.log(`Visible text for selected option: ${selectedText}`);

        await page.type(citizenshipbachelorhood.ForeignAddress, 'Test Address');
        await page.selectOption(citizenshipbachelorhood.PlaceOfBirthCountry, '161');
        await page.click(citizenshipbachelorhood.PlaceOfBirthCountry);
        await page.keyboard.press('Escape');
        await page.selectOption(citizenshipbachelorhood.PlaceOfBirthState, '24')

        await page.locator('#ForeignCity').click();
        await page.locator('#ForeignCity').fill('test');

        await page.locator('li').filter({ hasText: 'Upload Identity Card Issued' }).getByRole('textbox').setInputFiles('Dummy_PDF.pdf');

        await page.getByRole('heading', { name: 'REASON(s) for application' }).click();
        await page.type(citizenshipbachelorhood.ReasonOfApplication, 'Reason');

        await page.getByRole('heading', { name: 'foreign spouse information' }).click();
        await page.type(citizenshipbachelorhood.ForeignSpouseEmail, email);
        await page.type(citizenshipbachelorhood.ForeignSpousePhoneNumber, phone);

        await page.getByRole('heading', { name: 'Documents Upload' }).click();
        await uploadDocument(page, 'Dummy_PDF.pdf')

        //Proceed button click
        await page.getByRole('link', { name: 'Proceed' }).click();
        const isVisible = await page.getByText('You have successfully').isVisible();
        if (isVisible) {
            console.log('Success Message')
        } else {
            console.log("The text is not visible.");
        }
        //await page.getByRole('link', { name: 'Submit' }).click();

        //For payment 
        // await page.getByLabel('The information provided').check();
        // await page.getByRole('button', { name: 'Proceed To Payment' }).click();
        // await page.getByRole('link', { name: 'Ok' }).click();
    });
});
