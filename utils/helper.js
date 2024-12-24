const { expect } = require('@playwright/test');
// const { locators } = require('');
const { locators } = require("../constants/locators")
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const screenshotDir = path.join(__dirname, '../Screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}


export async function login(page) {
  // Fetch login credentials from environment variables
  const LOGIN_URL = process.env.LOGIN_URL;
  const LOGIN_EMAIL = process.env.LOGIN_EMAIL1;
  const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD1;
  const LOGIN_PASSWORD_SECONDARY = process.env.LOGIN_PASSWORD_SECONDARY;

  // Navigate to the login page
  await page.goto(LOGIN_URL);

  // Click on LOGIN link and complete login steps
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByRole('textbox', { name: 'Enter your Password' }).fill(LOGIN_PASSWORD_SECONDARY);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Secondary login if necessary
  await page.waitForSelector('text=Login');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('* Email Address').type(LOGIN_EMAIL, { delay: 100 });
  await page.getByLabel('* Password').type(LOGIN_PASSWORD, { delay: 100 });
  await page.getByLabel('* Password').press('Enter');
  await page.getByRole('button', { name: 'Continue' }).click();
}

// Helper function to navigate to the marriage form
export async function navigateToMarriageForm(page) {
  await page.goto(process.env.MARRIAGE_FORM_URL);
  expect(await page.title()).toBe('My Applications');

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#defaultNavbar1').getByText('Marriage').click();
  await page.getByRole('link', { name: 'Apply For Marriage (New' }).click();

  await page.locator(locators.modalMrgPlaceSelection)
    .filter({ hasText: 'FEDERAL MARRIAGE REGISTRY' })
    .locator(locators.placeOfMarriage).check();
  await page.getByRole('link', { name: 'Proceed' }).click();

  // Handle the 'Requirement' popup
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Requirement' }).first().click();
  const page1 = await page1Promise;
  await page1.close(); // Close the popup window

  // Continue interaction with the main page
  await page.locator('#ApplyforOrdinaryMarriage').click();
  await page.getByRole('link', { name: 'Ok' }).click();
}

export function getRandomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function allrequired(page) {
  
  await page.getByRole('link', { name: 'Proceed' }).click();
  const errorMessageLocator = page.locator('text=Please complete all the required field(s).');
  await expect(errorMessageLocator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);
  //await page.screenshot({ path: path.join(screenshotDir, 'citizenshipbyrocleaveallfieldempty.png'), fullPage: true });

  const url = await page.url();
  const formattedUrl = url.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Replace special characters with underscores
  const screenshotPath = path.join(screenshotDir, `${formattedUrl}_emptyfield.png`);

  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log('Screenshot saved as ',formattedUrl);
  await expect(errorMessageLocator).toHaveText('Please complete all the required field(s).');

  await page.getByRole('link', { name: 'Ok' }).click();
}

export async function invalidfiletype(page) {
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
          const url = await page.url();
          const formattedUrl = url.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Replace special characters with underscores
          const screenshotPath = path.join(screenshotDir, `${formattedUrl}_invalidfile.png`);
        
          await page.screenshot({ path: screenshotPath, fullPage: true });
        
          console.log('Screenshot saved as ',formattedUrl);
  
}

export async function submitform(page) {
      //Proceed button click
      await page.getByRole('link', { name: 'Proceed' }).click();
      const isVisible = await page.getByText('You have successfully').isVisible();
      if (isVisible) {
          console.log('Success Message')
      } else {
          console.log("The text is not visible.");
      }
      //await page.getByRole('link', { name: 'Submit' }).click();
  
}
export const addressradio = ["registry", "postal"];

export const addressradio1 = ["yes", "no"];

export const marriagecounduted = ["stategovernemt", "placeofworship"];

export const livingfatherhusband = ["living", "deceased"];

export const livingfatherwife = ["living", "deceased"];


