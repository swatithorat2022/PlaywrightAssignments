import { test, expect, chromium } from '@playwright/test';

test('Validating Alerts in Web Page', async () => {
    const browser = await chromium.launch({headless:false,args:['--disable-notifications']});
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //1. Enter URL and Launch the application (https://demoqa.com/)        
    await page.goto("https://demoqa.com/");
    await page.context().clearCookies();

    //2. Maximize the browser window to a specific resolution. 
    await page.setViewportSize({ width: 1920, height: 1080 });

    //3. Locate the alert style and click on the same
    const alertTile = page.locator('//h5[text()="Alerts, Frame & Windows"]');
    await alertTile.click();

    //4. Click on the 'Alerts' menu
    const alertsMenu = page.locator('//span[text()="Alerts"]');
    await alertsMenu.click();

    //5. Locate alert buttons to trigger the alerts. 
    const infoAlertButton = await page.locator('//button[@id="alertButton"]');
    const confirmAlertButton =await page.locator('//button[@id="confirmButton"]');
    const promptAlertButton =await page.locator('//button[@id="promtButton"]');

    //6. Click on the information alert button and trigger the alert and select 'OK' from the alert.
    
    page.once('dialog', async dialog => {

        //copy and print the message displayed in the alert
        console.log("Information Alert Message is :" + dialog.message());

        //select ok button
        await dialog.accept();

    });

    page.context().clearCookies();
    //trigger information alert
    infoAlertButton.click();
    
    //Wait for 2 seconds 
    await page.waitForTimeout(6000);

    //7. Click on the confirmation alert button and trigger the alert and select 'Cancel' from the alert.
    
    page.once('dialog', async dialog => {

        //copy and print the message displayed in the alert
        console.log("Confirmation Alert Message is :" + dialog.message());

        //select ok button
        await dialog.dismiss();

    });

    //trigger confirmation alert
    await confirmAlertButton.click();

    //Wait for 2 seconds 
    await page.waitForTimeout(2000);

    //7. Click on the prompt alert button and trigger the alert and select 'Ok' from the alert.
    page.once('dialog', async dialog => {
;
        //copy and print the message displayed in the alert
        console.log("Prompt Alert Message is :" + dialog.message());

        //select ok button
        await dialog.accept("Playwright Training");

    });

    //trigger prompt alert
   await promptAlertButton.click();

    //Wait for 5 seconds to see the results. 
    await page.waitForTimeout(5000);

});