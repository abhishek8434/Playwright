import { applyforworship } from '../constants/locators';
import { faker } from '@faker-js/faker';


const firstName = faker.person.firstName('male');
const lastName = faker.person.lastName('male');
const email = faker.internet.email({ firstName, lastName, provider: 'yopmail.com' })
function generateNigerianPhoneNumber() {
    // Array of valid prefixes
    const prefixes = ['803', '806', '813']; // Common prefixes for Nigerian networks

    // Randomly select a prefix from the array
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    const randomPhoneBody = faker.string.numeric(7); // Generate a 7-digit number
    return `+234-${randomPrefix}-${randomPhoneBody.slice(0, 4)} ${randomPhoneBody.slice(4)}`; // Format the number
}

const phone = generateNigerianPhoneNumber()



export async function generalFlow(page) {
    await page.selectOption(applyforworship.PlaceOfOath, '16');
    await page.waitForTimeout(2000)
    await page.selectOption(applyforworship.PlaceOfOath, '1');
    await page.waitForTimeout(2000)
    await page.selectOption(applyforworship.PlaceOfOath, '16');

    await page.selectOption(applyforworship.State, '46');
    await page.selectOption(applyforworship.Localarea, '1694');
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.locator('div').filter({ hasText: /^To navigate, press the arrow keys\.$/ }).nth(1).click();
    await page.locator('div').filter({ hasText: /^To navigate, press the arrow keys\.Location\(9\.458110548663116, 8\.675299999999998\)$/ }).nth(1).click();

    await page.getByRole('heading', { name: 'Place Of Worship Representative Details' }).click();
    await page.type(applyforworship.RepresentativeSurname, lastName);
    await page.type(applyforworship.RepresentativeFirstName, firstName);
    await page.type(applyforworship.RepresentativeEmail, email);
    await page.type(applyforworship.RepresentativePhone, phone);

    await page.getByRole('heading', { name: 'Further Details On Place Of' }).click();
    const option = ['1', '0'];
    // Pick a random option from the array
    const randomOption = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.DoesChurchHaveOrdainedPastor).selectOption(randomOption);
    // Fetch the visible text of the selected option
    const selectedText = await page.$eval(
        `${applyforworship.DoesChurchHaveOrdainedPastor} option[value="${randomOption}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption}`);
    console.log(`Visible text for selected option: ${selectedText}`);

    const randomOption1 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.DoesChurchHaveStandByGenerator).selectOption(randomOption1);
    // Fetch the visible text of the selected option
    const selectedText1 = await page.$eval(
        `${applyforworship.DoesChurchHaveStandByGenerator} option[value="${randomOption1}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption1}`);
    console.log(`Visible text for selected option: ${selectedText1}`);

    const option2 = ['1', '2', '3'];
    // Pick a random option2 from the array
    const randomOption2 = option2[Math.floor(Math.random() * option2.length)];
    // Select the randomly chosen option2
    await page.locator(applyforworship.DoesChurchHaveProvisionForSafekeeping).selectOption(randomOption2);
    // Fetch the visible text of the selected option2
    const selectedText2 = await page.$eval(
        `${applyforworship.DoesChurchHaveProvisionForSafekeeping} option[value="${randomOption2}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption2}`);
    console.log(`Visible text for selected option: ${selectedText2}`);

    const randomOption3 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.IsChurchBuildingCompleteAndAllItemsAboveInPlace).selectOption(randomOption3);
    // Fetch the visible text of the selected option
    const selectedText3 = await page.$eval(
        `${applyforworship.IsChurchBuildingCompleteAndAllItemsAboveInPlace} option[value="${randomOption3}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption3}`);
    console.log(`Visible text for selected option: ${selectedText3}`);

    const randomOption4 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.IsChurchBuiltOfConcreteWall).selectOption(randomOption4);
    // Fetch the visible text of the selected option
    const selectedText4 = await page.$eval(
        `${applyforworship.IsChurchBuiltOfConcreteWall} option[value="${randomOption4}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption4}`);
    console.log(`Visible text for selected option: ${selectedText4}`);

    const randomOption5 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.DoesChurchHaveCleanEnvironment).selectOption(randomOption5);
    // Fetch the visible text of the selected option
    const selectedText5 = await page.$eval(
        `${applyforworship.DoesChurchHaveCleanEnvironment} option[value="${randomOption5}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption5}`);
    console.log(`Visible text for selected option: ${selectedText5}`);

    const randomOption6 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.DoesChurchHaveWaterCloset).selectOption(randomOption6);
    // Fetch the visible text of the selected option
    const selectedText6 = await page.$eval(
        `${applyforworship.DoesChurchHaveWaterCloset} option[value="${randomOption6}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption6}`);
    console.log(`Visible text for selected option: ${selectedText6}`);

    const randomOption7 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.DoesChurchHaveAdeQuateVentilation).selectOption(randomOption7);
    // Fetch the visible text of the selected option
    const selectedText7 = await page.$eval(
        `${applyforworship.DoesChurchHaveAdeQuateVentilation} option[value="${randomOption7}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption7}`);
    console.log(`Visible text for selected option: ${selectedText7}`);

    const randomOption8 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.DoesChurchHavePublicAddressSystem).selectOption(randomOption8);
    // Fetch the visible text of the selected option
    const selectedText8 = await page.$eval(
        `${applyforworship.DoesChurchHavePublicAddressSystem} option[value="${randomOption8}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption8}`);
    console.log(`Visible text for selected option: ${selectedText8}`);

    const randomOption9 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.isChurchHavePermanentSite).selectOption(randomOption9);
    // Fetch the visible text of the selected option
    const selectedText9 = await page.$eval(
        `${applyforworship.isChurchHavePermanentSite} option[value="${randomOption9}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption9}`);
    console.log(`Visible text for selected option: ${selectedText9}`);

    const randomOption10 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.drpChurchExtinguisher).selectOption(randomOption10);
    // Fetch the visible text of the selected option
    const selectedText10 = await page.$eval(
        `${applyforworship.drpChurchExtinguisher} option[value="${randomOption10}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption10}`);
    console.log(`Visible text for selected option: ${selectedText10}`);

    const randomOption11 = option[Math.floor(Math.random() * option.length)];
    // Select the randomly chosen option
    await page.locator(applyforworship.IsChurchregistredUnderLandPerpetualAct).selectOption(randomOption11);
    // Fetch the visible text of the selected option
    const selectedText11 = await page.$eval(
        `${applyforworship.IsChurchregistredUnderLandPerpetualAct} option[value="${randomOption11}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption11}`);
    console.log(`Visible text for selected option: ${selectedText11}`);

    await page.getByRole('heading', { name: 'Previous License Information' }).click();

    // Check if "yes" is selected or available
    if (await page.locator(applyforworship.previouslicenseyes).isChecked()) {
        // Actions when "yes" is selected
        console.log("Yes is selected. Executing actions for 'yes'.");
        await page.locator(applyforworship.lastRenewalDate).click();
        await page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('2023');
        await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('9');
        await page.getByRole('link', { name: '17' }).click();

        //await page.locator('#file_div_LastRenewal #LastRenewalReceiptFile').setInputFiles('Dummy_PDF.pdf');
        await page.locator(applyforworship.LastRenewalReceiptFile).setInputFiles('Dummy_PDF.pdf');
        // await page.type(applyforworship.OutstandingRenewalFee, '50000');
    } else {
        // Actions when "no" or another option is selected
        console.log("No is selected. Executing actions for 'no'.");
        await page.locator(applyforworship.previouslicenseno).click();
        // Add additional steps for the "else" scenario if required
    }

    await page.getByRole('heading', { name: 'Documents Upload' }).click();
    const option3 = ['1', '2', '3', '4', '5'];
    // Pick a random option3 from the array
    const randomOption12 = option3[Math.floor(Math.random() * option3.length)];
    // Select the randomly chosen option3
    await page.locator(applyforworship.IDCardType).selectOption(randomOption12);
    // Fetch the visible text of the selected option3
    const selectedText12 = await page.$eval(
        `${applyforworship.IDCardType} option[value="${randomOption12}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption12}`);
    console.log(`Visible text for selected option: ${selectedText12}`);

}

export async function uploadDocumentWithNameAndType(page, documentName, fileType) {
    // Type the document name into the necessary field
    const option3 = ['1', '2', '3', '4', '5'];
    const randomOption13 = option3[Math.floor(Math.random() * option3.length)];
    // Select the randomly chosen option3
    await page.locator(applyforworship.PastorTypeID).selectOption(randomOption13);
    // Fetch the visible text of the selected option3
    const selectedText13 = await page.$eval(
        `${applyforworship.PastorTypeID} option[value="${randomOption13}"]`,
        option => option.textContent.trim()
    );
    console.log(`Randomly selected option: ${randomOption13}`);
    console.log(`Visible text for selected option: ${selectedText13}`);
    // Define file path based on fileType
    let filePath;
    if (fileType === 'pdf') {
        filePath = 'Dummy_PDF.pdf';  // Path for PDF files
    } else if (fileType === 'txt') {
        filePath = 'invalid-file.txt';  // Path for TXT files
    } else {
        throw new Error('Invalid file type');
    }
    // Upload the file
    applyforworship.PastorMinisterIdentificationFile,
        applyforworship.PassportPhotographsofPastorMinisterFile,
        applyforworship.PowerofAttorneyFile

}
async function uploadFile(page, selector, filePath) {
    await page.locator(selector).setInputFiles(filePath);
}

export async function uploadDocumentsWithName(page, documentName, fileType) {
    let filePath;
    if (fileType === 'pdf') {
        filePath = `${'Dummy_PDF'}.pdf`;
    } else if (fileType === 'txt') {
        filePath = `${'invalid-file'}.txt`;
    } else {
        throw new Error('Invalid file type');
    }

    const documentsToUpload = [
        'Upload Id Card Of',
        'Upload Certificate Of Occupancy Upload Upload Cancel',
        'Upload Certificate Of Incorporation Upload Upload Cancel',
        'Upload First Five Pages and',
        'Upload Ordination Certificate'
    ];

    for (const documentText of documentsToUpload) {
        await page.locator('li').filter({ hasText: documentText }).getByRole('textbox').setInputFiles(filePath);
    }

}
