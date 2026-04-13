import{test,expect,chromium} from '@playwright/test';
test('Assignment2',async()=>{
//1. Launch browser window(Chrome)
const browser=await chromium.launch({headless:false,channel:'chrome'});
const context=await browser.newContext();
const page = await context.newPage();
//2. Maximize the browser window
await page.setViewportSize({width:1920,height:1080});

//3. Delete all the cookies        
await context.clearCookies();
//4. Enter URL and Launch the application (https://demoqa.com/automation-practice-form)        
await page.goto('https://demoqa.com/automation-practice-form');

//5. Wait for Page-load
await page.waitForLoadState('load');
//6. Enter First name and Last name 
const firstName=await page.getByPlaceholder('First Name');;
await firstName.fill('Swati');
const lastName=await page.getByPlaceholder('Last Name');
await lastName.fill('Sharma');           
//7. Enter Email              
const email=await page.locator('input#userEmail');  
await email.fill('swati.sanjay@gmail.com');

//8. Select Gender (Male)                
await selectGender(page,'Female');
//9. Enter mobile number                
const mobileNumber=await page.getByPlaceholder("Mobile Number");
await mobileNumber.fill('9876543210');

//10.Select DOB (1-Feb-1991)                
await selectDOB(page,'1','February','1991');
//11.Search and Select Computer Science 
await selectSubject(page,'Computer Science');       


//12.Select Hobbies as Sports and Reading                
await selectHobbies(page,["Sports","Reading"]);

//13.Upload photo          

 const filePath = 'tests\\testdata\\photo_1.jpg';     
 const chooseFileButton = await page.locator('input#uploadPicture');
await chooseFileButton.setInputFiles(filePath);
 //wait for 10 seconds to visually verify the uploaded photo.
    await page.waitForTimeout(10000);

    //12.Submit Details 
    const submitButton = page.locator('button#submit');
    await submitButton.click();             
    
//16. Close browser windowx
browser.close(); //close the browser after submission
});

//Common method to select the hobbies. 
async function selectHobbies(page: any, options: string[]) {

    for (let val of options) {
        const hobby = page.locator('//label[text()="' + val + '"]');
        if (!hobby.isChecked()) {
            await hobby.click();
        }
    }
}

//Common method to search and select subjects. 
async function selectSubject(page: any, subject: string) {

    //Click on the subject container to activate the input field
    const subjectContainer = page.locator("//div[contains(@class,'subjects-auto-complete__input-container')]");
    await subjectContainer.click();

    // Type the subject
    const subjectInput = page.locator("//input[@id='subjectsInput']");
    await subjectInput.fill(subject);

    //select the suggestion
    const suggestion = await page.getByRole('option', { name: subject });
    await expect(suggestion).toBeVisible();

    // Click on the suggestion to select it
    await suggestion.click({ force: true });
}


//Common method to select the gender. 
async function selectGender(page: any, gender: string) {
    const genderLabel = page.locator('//label[text()="' + gender + '"]');
    await genderLabel.click();
}

//Common method to select the date of birth
async function selectDOB(page: any, date: string, month: string, year: string) {

    //launch the calendar
    const calendar = page.locator('input#dateOfBirthInput');
    calendar.click();

    //select the month
    const monthDropdown = page.locator('select.react-datepicker__month-select');
    await expect(monthDropdown).toBeVisible();
    await monthDropdown.selectOption({ label: month });

    //select the year
    const yearDropdown = page.locator('select.react-datepicker__year-select');
    await yearDropdown.selectOption({ label: year });

    //select the date
    const dateField = page.locator('//div[text()="' + date + '" and contains (@aria-label, "' + month + '")]');
    dateField.click();

}