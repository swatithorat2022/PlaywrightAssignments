import { test, expect,chromium } from '@playwright/test';
test('Assignment1',async()=>{
  //Launch the browser window (Chrome)
const browser = await chromium.launch({ headless: false, channel: 'chrome' }); //msedge for edge //, args: ['--start-maximized']
const context=await browser.newContext();
const page = await context.newPage();

//Launch application using url (https://parabank.parasoft.com/parabank/index.htm)
await page.goto('https://parabank.parasoft.com/parabank');
//2.verify application logo is displayed
const logo = await page.locator("img.logo");
await expect(logo).toBeVisible();

//3.Verify application caption displayed as "Experience the difference"
const caption = await page.getByText("Experience the difference");
await expect(caption).toBeVisible();
//4.Enter invalid username
const userName=await page.locator('input[name="username"]');
await userName.fill('Swati');
//5.Enter empty Password
const password= await page.locator('input[name="password"]');
await password.fill('');
//6.Click on login button
const loginbutton = await page.locator('input[type="submit"]');
await loginbutton.click();

//7.7.Verify the error message "Please enter a username and password."
const errormessage= await page.locator('p.error');
let errorText=await errormessage.textContent();
expect(errorText).toBe("Please enter a username and password.");

//8.Click on admin page link
const adminpageLink=await page.locator('//a[text()="Admin Page"]');
await adminpageLink.click();
//9.select the option "soap" from dba mode radio button
const soapOption=await page.locator('input[value="soap"]');
await soapOption.click();

//10.Scroll to element dropdown
 const elementDropDown=await page.locator('select#loanProvider');
 await elementDropDown.scrollIntoViewIfNeeded();

 //11.Select the option web service from the dropdown
  await elementDropDown.selectOption('Web Service');

  //12.click on submit button
  const submitButton= await page.locator('input[value="Submit"]');
  await submitButton.click();

  //13.verify submission is successful by validating success message

  const successMessage=await page.getByText("Settings saved successfully.");
  let successText=await successMessage.textContent();
  expect(successText).toBe("Settings saved successfully.");

  //14.Click on services page link

  const seviceLink=await page.locator("ul.leftmenu>li>a[href*='services']")
  await seviceLink.click();

  //15.wait for service page
  const bookStoreServices=await page.locator('//span[text()="Bookstore services:"]');
  await expect(bookStoreServices).toBeVisible();

  //16.Scroll down till bookstore services table
await bookStoreServices.scrollIntoViewIfNeeded();

//17.get total rows of books store services table
const tableRows=await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr');
let rowCount=await tableRows.count();
expect(rowCount).toBe(8);

//18.get total columns of books store services table
const tablecols=await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[1]//td');
let colCount=await tablecols.count();
expect(colCount).toBe(3);

//19.Print table data (row wise and column wise data)
 for(let r = 1; r<=await rowCount ; r++){

        //loop to iterate columns
        for(let c=1; c<=await colCount ; c++){
            const cell= await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr['+r+']//td['+c+']');
            const cellValue= await cell.textContent();
             console.log("Row "+ r + " , Column "+ c+ " value is : "+ cellValue);

        }


    }



});
