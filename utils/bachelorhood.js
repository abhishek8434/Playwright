import { citizinshipform } from '../constants/locators';
import { faker } from '@faker-js/faker';
import { citizenshipbachelorhood } from '../constants/locators';



const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
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


export async function uploadDocumentWithNameAndType(page, documentName, fileType) {
    // Type the document name into the necessary field
    await page.type(citizinshipform.duNecessaryDocumentName, documentName);
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
    await page.locator(citizinshipform.duNecessaryDocument).setInputFiles(filePath);
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
        '* Upload Formal Application',
        '* Upload passport photo of Husband Upload Upload Cancel',
        '* Upload passport photo of Wife Upload Upload Cancel',
        '* Upload Affidavit of non-',
        '* Upload Birth Certificate or',
        '* Upload Certificate of State',
        '* Upload Notarized letter',
        '* Upload Nigerian',
        '* Upload Spouse means of',
        '* Upload Notarized consent',
        '* Upload Couples full length',
        '* Upload Full length photo of',
        '* Upload Marriage document of',
        '* Upload Proof of Address eg'
    ];

    for (const documentText of documentsToUpload) {
        await page.locator('li').filter({ hasText: documentText }).getByRole('textbox').setInputFiles('Dummy_PDF.pdf');
    }

}


export async function generalFlow(page) {
    const option = ['1', '2'];

    // Pick a random option from the array
    const randomOption = option[Math.floor(Math.random() * option.length)];

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
}
