import { citizinshipform } from '../constants/locators';
import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const firstName1 = faker.person.firstName();
const lastName1 = faker.person.lastName();
const firstName2 = faker.person.firstName();
const lastName2 = faker.person.lastName();

export async function generalFlow(page) {
    await page.getByRole('heading', { name: 'Personal Information' }).click();
    await page.waitForTimeout(2000);
    // Check if some content within the dropdown is visible, e.g. Date of Birth field
    const isDropdownOpened = await page.locator('#DateOfBirth').isVisible();
    // If the content is not visible (dropdown did not open), click again
    if (!isDropdownOpened) {
        console.log('Dropdown not opened, clicking again...');
        await page.getByRole('heading', { name: 'Personal Information' }).click();
    }
    await page.locator('#DateOfBirth').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('1980');
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('10');
    await page.getByRole('link', { name: '6', exact: true }).click();
    await page.selectOption(citizinshipform.piBirthCountry, '161');
    await page.click(citizinshipform.piBirthCountry);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.piBirthState, '4');
    await page.type(citizinshipform.piCityOfBirth, 'Bauchi');
    await page.locator('#DateFirstArrivalToNigeria').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('2023');
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('10');
    await page.getByRole('link', { name: '7', exact: true }).click();
    await page.selectOption(citizinshipform.piPresentNationality, '126');
    // Dropdown selector 
    const dropdownSelector = citizinshipform.piPresentNationalityAcquired;
    // Define the available options (e.g., '1', '2', '3')
    const options = ['1', '2', '3'];
    // Select a random option from the array
    const randomOption = options[Math.floor(Math.random() * options.length)];
    // Select the random option from the dropdown
    await page.selectOption(dropdownSelector, randomOption);
    console.log(`Selected option: ${randomOption}`);
    await page.type(citizinshipform.piPlaceOfAcquisition, 'Bauchi');
    await page.locator('#DateOfAcquisition').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('8');
    await page.getByRole('link', { name: '2', exact: true }).click();
    await page.type(citizinshipform.piPreviousAddress, 'Nigera');
    await page.selectOption(citizinshipform.piPreviousCountry, '161');
    await page.click(citizinshipform.piPreviousCountry);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.piPreviousState, '2');
    await page.type(citizinshipform.piPreviousCity, 'Cross River');
    await page.type(citizinshipform.piPresentAddress, 'Nigeria');
    await page.selectOption(citizinshipform.piPresentCountry, '161');
    await page.click(citizinshipform.piPresentCountry);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.piPresentState, '22');
    await page.type(citizinshipform.piPresentCity, 'Abia');

    //Professional Information
    await page.getByRole('heading', { name: 'Professional Information' }).click();
    await page.type(citizinshipform.profOccupation, 'Student');
    await page.type(citizinshipform.profNameOfOrganization, 'Bauchi Univerisity');
    await page.type(citizinshipform.profOrganizationType, 'Educational');
    await page.type(citizinshipform.profPositionHeld, 'Student');
    await page.locator('#DivProfessionalInformation').getByRole('button').click();
    await page.getByRole('link', { name: 'Nigerian naira' }).click();
    await page.type(citizinshipform.profMonthlySalary, '98765214');

    //Citizenship Information
    await page.getByRole('heading', { name: 'Citizenship Information' }).click();
    await page.selectOption(citizinshipform.ciCitizenshipNationality, '126');
    const dropdownSelector1 = citizinshipform.ciHowAcquired;
    const randomOption1 = options[Math.floor(Math.random() * options.length)];
    await page.selectOption(dropdownSelector1, randomOption1);
    console.log(`Selected option: ${randomOption1}`);
    await page.type(citizinshipform.ciPlaceOfAcquisition, 'Place of acquisition');
    await page.locator('[id="CitizenshipNationalityList\\[0\\]\\.DateOfAcquisition"]').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('8');
    await page.getByRole('link', { name: '16' }).click();
    await page.type(citizinshipform.ciForeignLanguage, 'Hindi');

    const languageProficiencyOptions = ['Excellent', 'Good', 'Fair'];
    // Select a random option from the array
    const randomOption2 = languageProficiencyOptions[Math.floor(Math.random() * languageProficiencyOptions.length)];
    // Dynamically locate and check the randomly selected option
    await page.waitForTimeout(2000)
    console.log(randomOption2)
    await page.locator('#divLanguageForeignPart-1').getByLabel(randomOption2).check();

    await page.getByRole('button', { name: 'Add More Foreign Languages' }).click();

    const randomOption3 = languageProficiencyOptions[Math.floor(Math.random() * languageProficiencyOptions.length)];
    await page.type(citizinshipform.ciForeignLanguage1, 'Chinese');
    await page.locator('#divLanguageForeignPart-2').getByLabel(randomOption3).check();
    console.log(randomOption3)

    await page.getByRole('button', { name: 'Add More Foreign Languages' }).click();
    const randomOption4 = languageProficiencyOptions[Math.floor(Math.random() * languageProficiencyOptions.length)];
    await page.type(citizinshipform.ciForeignLanguage2, 'English');
    await page.locator('#divLanguageForeignPart-3').getByLabel(randomOption4).check();
    console.log(randomOption4)

    await page.click(citizinshipform.ciRemoveLanguage);
    await page.getByRole('link', { name: 'Ok' }).click();

    await page.type(citizinshipform.ciIndegenousLanguage, 'Nigerian');
    const randomOption5 = languageProficiencyOptions[Math.floor(Math.random() * languageProficiencyOptions.length)];
    await page.locator('#divLanguageIndigenousPart-1').getByLabel(randomOption5).check();
    console.log(randomOption5)

    await page.selectOption(citizinshipform.ciVisitedCountry, '38');
    await page.locator('#Edit_FromDate_0').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('6');
    await page.getByRole('link', { name: '1', exact: true }).click();
    await page.locator('#Edit_ToDate_0').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('7');
    await page.getByRole('link', { name: '31' }).click();
    await page.type(citizinshipform.ciPurposeOfVisit, 'Bussiness');
    await page.getByText('Yes').first().click();
    await page.locator('li').filter({ hasText: 'Do You Intend To Live In' }).getByLabel('Yes').check();
    await page.getByText('Yes').nth(1).click();
    await page.locator('li').filter({ hasText: 'Are You Willing To Renounce' }).getByLabel('Yes').click();
    await page.selectOption(citizinshipform.ciCountryToRenounce, '159');

    //Assets Owned
    await page.getByRole('heading', { name: 'Assets Owned' }).click();
    await page.type(citizinshipform.aoPropertiesWithinNigeria, 'House, CAR');
    await page.type(citizinshipform.aoOtherAssets, 'Stocks');
    await page.type(citizinshipform.aoPropertiesOutSideNigeria, 'House');
    await page.type(citizinshipform.aoAssetssOutSideNigeria, 'Investment');
    await page.locator('#DocumentList_0__Document').first().setInputFiles('Dummy_PDF.pdf');

    //Details Of Dependants
    await page.getByRole('heading', { name: 'Details Of Dependants' }).click();
    await page.type(citizinshipform.ddLastName, lastName);
    await page.type(citizinshipform.ddFirstName, firstName);
    await page.locator('#dtDependantsDOB').click();
    
    await page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('2000');
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('9');
    await page.getByRole('link', { name: '3', exact: true }).click();
    await page.selectOption(citizinshipform.ddCountryOfBirth, '156');
    await page.type(citizinshipform.ddRelationshipWithDependant, 'Spouse');
    await page.type(citizinshipform.ddAnnualSupportDependent, '15818848');
    await page.type(citizinshipform.ddResidentialAddressInNigeria, 'Nigeria,Cross River');
    await page.locator('#DDLDependantcountry_0').selectOption('46');
    await page.selectOption(citizinshipform.ddCountry, '46');
    await page.click(citizinshipform.ddCountry);
    await page.keyboard.press('Escape');
    await page.type(citizinshipform.ddResidentialCityInNigeria, 'Cross River');
    await page.type(citizinshipform.ddResidentialAddressOutsideNigeria, 'Altanta');
    await page.selectOption(citizinshipform.ddResidentialCountryIsOutsideNigeria, '105');
    await page.click(citizinshipform.ddResidentialCountryIsOutsideNigeria);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.ddResidentialStateOutsideNigeria, '1558');

    await page.locator('#DependantsDetails_ResidentialCityInNigeria').nth(1).fill('Rafa');
    //await page.type(citizinshipform.ddResidentialCityOutNigeria).nth(1).type('Rafa');;
    await page.type(citizinshipform.ddPermanentResidentialAddress, 'Nigeria');
    await page.selectOption(citizinshipform.ddPermanentResidentialCountryId, '155');
    await page.click(citizinshipform.ddPermanentResidentialCountryId);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.ddPermanentResidentialStateId, '2331');
    await page.type(citizinshipform.ddPermanentResidentialCity, 'Zeen');

    //Guarantor's Details
    await page.getByRole('heading', { name: 'Guarantors’ Details' }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download' }).click();
    const download = await downloadPromise;
    await page.type(citizinshipform.gdLastName, lastName1);
    await page.type(citizinshipform.gdFirstName, firstName1);
    await page.type(citizinshipform.gdPlaceOfBirth, 'Nigeria');
    await page.selectOption(citizinshipform.gdNationality, '128');
    await page.type(citizinshipform.gdProfession, 'Engineer');
    await page.locator('#GuarantorDetailList_0__RankInProfession').fill('123');
    await page.type(citizinshipform.gdRankInProfession, '1');
    await page.locator('#DivGuarantorDetailPart-1 li').filter({ hasText: '* Date Of Birth' }).locator('span').nth(1).click();
    await page.locator('#GuarantorDetailList_0__DateOfBirth').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('1999');
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('8');
    await page.getByRole('link', { name: '16' }).click();
    await page.type(citizinshipform.gdHaveKnownOfGuarantor, '2 years');
    await page.type(citizinshipform.gdAddress, 'Nigeria');
    await page.selectOption(citizinshipform.gdCountry, '161');
    await page.click(citizinshipform.gdCountry);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.gdState, '24');
    await page.type(citizinshipform.gdCity, 'Cross River');
    await page.type(citizinshipform.gdLastName1, lastName2);
    await page.type(citizinshipform.gdFirstName1, firstName2);
    await page.type(citizinshipform.gdPlaceOfBirth1, 'Wills')
    await page.selectOption(citizinshipform.gdNationality1, '24');
    await page.type(citizinshipform.gdProfession1, 'Proff')
    await page.type(citizinshipform.gdRankInProfession1, '12')
    await page.locator('#GuarantorDetailList_1__DateOfBirth').click();
    await page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('1980');
    await page.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('11');
    await page.getByRole('cell', { name: '18' }).click();
    await page.type(citizinshipform.gdHaveKnownOfGuarantor1, '1 Year')
    await page.type(citizinshipform.gdAddress1, 'Nigeriaa')
    await page.selectOption(citizinshipform.gdCountry1, '161');
    await page.click(citizinshipform.gdCountry1);
    await page.keyboard.press('Escape');
    await page.selectOption(citizinshipform.gdState1, '4');
    await page.type(citizinshipform.gdCity1, 'Abia');

    //Reason For Application
    await page.getByRole('heading', { name: 'Reason(s) For Application' }).click();
    await page.type(citizinshipform.ReasonOfApplication, 'Citizenship data');


    //Declaration
    await page.getByRole('heading', { name: 'Declaration' }).click();
    const declaration = await page.getByText('do solemnly and sincerely declare that the particulars stated in the application are correct').isVisible();

    //Documents Upload
    await page.getByRole('heading', { name: 'Documents Upload' }).click();
}

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

    const documents = [
        citizinshipform.duPassportPhotograph,
        citizinshipform.duBirthCertificate,
        citizinshipform.du5PagesOfInternationalPassport,
        citizinshipform.duEvidenceOLivelihood,
        citizinshipform.duTaxclearanceCertificate,
        citizinshipform.duResidencePermit,
        citizinshipform.duEvidenceOfSocioEconomicContributions,
        citizinshipform.dusignedapplicationletter,
        citizinshipform.duGuarantorDownloadedFrom,
        citizinshipform.duGuarantorPassportPhotograph,
        citizinshipform.duGuarantorCurriculumVitae,
        citizinshipform.duGuarantorIdCard,
        citizinshipform.duGuarantorDownloadedFrom1,
        citizinshipform.duGuarantorPassportPhotograph1,
        citizinshipform.duGuarantorCurriculumVitae1,
        citizinshipform.duGuarantorIdCard1
    ];

    for (const selector of documents) {
        await uploadFile(page, selector, filePath);
    }
}
