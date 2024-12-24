import { faker } from '@faker-js/faker';
import * as dotenv from "dotenv";
const { expect } = require('@playwright/test');
const { locators } = require("../constants/locators")

dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL;
const LOGIN_EMAIL = process.env.LOGIN_EMAIL1;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD1;
const LOGIN_PASSWORD_SECONDARY = process.env.LOGIN_PASSWORD_SECONDARY;


// Initial Phase 
export async function initiateScript(page) {
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

export const addressradio = ["registry", "postal"];

export const addressradio1 = ["yes", "no"];

export const marriagecounduted = ["stategovernemt", "placeofworship"];

export const livingfatherhusband = ["living", "deceased"];

export const livingfatherwife = ["living", "deceased"];

// Nigerian phone numbers start with prefixes such as 080, 081, 090, 070 followed by 7 digits
// Generate a phone number in the format +234XXXXXXXXXX

export function generateNigerianPhoneNumber() {
  // Array of valid prefixes
  const prefixes = ['803', '806', '813']; // Common prefixes for Nigerian networks

  // Randomly select a prefix from the array
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  const randomPhoneBody = faker.string.numeric(7); // Generate a 7-digit number
  return `+234-${randomPrefix}-${randomPhoneBody.slice(0, 4)} ${randomPhoneBody.slice(4)}`; // Format the number
}

export function getFullName(gender) {
  let firstName = faker.person.firstName(gender);
  let lastName = faker.person.firstName(gender);
  return (firstName + " " + lastName);
}
