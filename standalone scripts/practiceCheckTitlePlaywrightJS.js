import {chromiumm} from playwright;
import * as ammazonLocators from '../amazonLocators.js';

const expectedTitle = 'Welcome';

async function runtest(testName, testFn){

    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https:', {
        waitUntil: 'networkidle'
    });

    try{
        await testFn({browser, context, page});
        console.log(`completed: `, testname);
    }catch(e){
        console.log(`failed`, e.message);
        
        await page.screenshot({
            path: '',
            fullPage: true
        });

        console.log(`ss saved`);
    }finally{
        await browser.close();
    }
}

async function scrollToElement({page, selector, description = 'description'}){

    const el = await page.waitForSelector(selector, {
        state: 'visible',
        timeout: 10000
    });

    await el.scrollIntoViewIfNeeded();
    console.log('scrolled');
}

async function tc1({page}){

    const page1Header = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeout: 10000
    });

    const actual = (await page1Header.textContent() || '').trim();
    if(actual === expected){
        console.log('passed');
    }else{
        console.log('failed');
    }
}

async function tc2({page}){
    await page.locator(amazonLocators.WELCOME_AMAZON_XPATH).click();

    await page.waitForSelector(amazonLocators.heroImage, {
        state: 'visible',
        timeout: 10000
    });

    const currentUrl = page.url();
    if(currentUrl.includes('amazonn.ie')){
        console.log('correct url');
    }else{
        console.log('failed');
    }

    await scrollToElement(page, amazonLocators.shoppingBenefitsXpath, 'Shopping benefits on Amazon.ie');

    const accountListEl = await page.waitForSelector(amazonLocators.accountListXpath, {
        state: 'visible',
        timeout: 10000
    });

    await accountListEl.hover();

    const signInEl = await page.waitForSelector(amazonLocators.signInXpath, {
        state: 'visible',
        timeout: 10000
    });

    await signInEl.click();

    const emailEl = await page.waitForSelector(amazonLocators.emailXpath, {
        state: 'visible',
        timeout: 10000
    });

    await emailEl.fill('08700376973');
    await page.pause();
}

async function tc3({browser, context, page}){

    const page2 = await context.newPage();
    const page2Header = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeout: 10000
    });

    const actual2 = (await page2Header.textContent() || '').trim();
    if(actual2 === expected){
        console.log('passed');
    }else{
        console.log('failed');
    }

    const page3 = await context.newPage();
    const page3Header = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeout: 10000
    });

    const actual3 = (await page3Header.textContent() || '').trim();
    if(actual3 === expected){
        console.log('passed');
    }else{
        console.log('failed');
    }

    await page.bringToFront();
    const page1Header = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeout: 10000
    });

    const actual1 = (await page1Header.textContent() || '').trim();
    if(actual1 === expected){
        console.log('passed');
    }else{
        console.log('failed');
    }

    await page3.bringToFront();
    const page3Header2 = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeout: 10000
    });

    const actual32 = (await page3Header2.textContent() || '').trim();
    if(actual32 === expected){
        console.log('passed');
    }else{
        console.log('failed');
    }

    const context2 = browser.newContext();
    const newPageContext2 = context2.newPage();

    await newPageContext2.goto('https:', {
        state: 'visible',
        timeout: 10000
    });

    const windowWelcome = await newPageContext2.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeout: 10000
      });
    
      // Read that text and log it.
      const windowWelcomeText = (await windowWelcome.textContent() || '').trim();
      console.log('TC3 - New WINDOW welcome text:', windowWelcomeText);
    
      // Optional debug
      // await windowPage.pause();
    
      // Close the new window context.
      await context2.close();
}

(async () => {

    await runtest('verify1', tc1);
    await runtest('verify2', tc2);
    await runtest('verify3', tc3);

})();