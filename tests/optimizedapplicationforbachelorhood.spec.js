const { test, expect, chromium, firefox, webkit } = require('@playwright/test');
import { allrequired, invalidfiletype, login, submitform } from '../utils/helper';
import { generalFlow, uploadDocumentWithNameAndType, uploadDocumentsWithName } from '../utils/bachelorhood';


test.describe('Apply For Citizenship', () => {
    let browser;
    let context;
    let page;

    test.beforeAll(async () => {
        // Setup browser and context manually
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        await login(page);

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

    
    test('TC 1: Leave all mandatory field blank', async () => {
        await allrequired(page)

    });    
    
    test('TC 2: Negative Flow', async () => {
        await generalFlow(page)
        await uploadDocumentsWithName(page, 'Citizenship data', 'txt');
        await uploadDocumentWithNameAndType(page, 'Citizenship data', 'txt');
        await invalidfiletype(page);
    });
  
    test('TC 3: Positive Flow', async () => {
        
        await generalFlow(page);
        await uploadDocumentsWithName(page, 'Citizenship data', 'pdf');
        await uploadDocumentWithNameAndType(page, 'Citizenship data', 'pdf');
        await submitform(page);
        // For payment
        // await page.getByLabel('The information provided').check();
        // await page.getByRole('button', { name: 'Proceed To Payment' }).click();
        // await page.getByRole('link', { name: 'Ok' }).click();

    });

});
