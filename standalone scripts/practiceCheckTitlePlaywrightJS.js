import {chromium} from playwright;
import * as amazonLocators from '../amazonLocators.js';

const expectedTitle = '';

async function runtest(testName, testFn){

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https:', {
        waitUntil: 'networkidle'
    });

    try{
        await testFn({browser, context, page});
        console.log(` ${testName} completed`);
    }catch(e){
        console.log('failed', e.message);

        await page.screenshot({
            path: 'path',
            fullPage: true
        });
        console.log('took ss');
    }finally{
        await browser.close();
    }
}

async function scrollToElement(page, selector, description = 'description'){

    const el = await page.waitForSelector(selector, {
        state: 'visible',
        timeOut: 10000
    });

    el.scrollIntoViewIfNeeded();

    console.log('scrolled');
}

async function tc1({page}){

    const header = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeOut: 10000
    });

    const actual = (await header.textContent() || '').trim();

    if(actual === expectedTitle){
        console.log();
    }else{
        console.log();
    }
}

async function tc2({page}){
    await page.locator(amazonLocators.WELCOME_AMAZON_XPATH).click();

    await page.waitForSelector(amazonLocators.heroImage, {
        state: 'visible',
        timeOut: 10000
    });

    const url = page.url();

    if(url.includes('amazon.ie')){
        console.log();
    }else{
        console.log();
    }

    await scrollToElement(page, amazonLocators.ShoppingBenefits, 'description');

    const accountListEl = await page.waitForSelector(amazonLocators.accountListXpath, {
        state: 'visible',
        timeOut: 10000
    });

    await accountListEl.hover();

    const signInEl = await page.waitForSelector(amazonLocators.signInXpath, {
        state: 'visible',
        timeOut: 10000
    });

    await signInEl.click();

    const emailEl = await page.waitForSelector(amazonLocators.emailXpath, {
        state: 'visible',
        timeOut: 10000
    });

    await emailEl.fill('0870376973');

    await browser.pause();

}

async function tc3({browser, context, page}){

    const newPage2 = await context.newPage();

    const headerNewPage2 = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeOut: 10000
    });

    const actualheaderNewPage2 = (await headerNewPage2.textContent() || '').trim();

    if(actualheaderNewPage2 === expectedTitle){
        console.log();
    }else{
        console.log();
    }

    const newPage3 = await context.newPage();

    const headerNewPage3 = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeOut: 10000
    });

    const actualheaderNewPage3 = (await headerNewPage3.textContent() || '').trim();

    if(actualheaderNewPage3 === expectedTitle){
        console.log();
    }else{
        console.log();
    }

    await page.bringToFront();

    const newWindow2 = await browser.newContext();
    const newWindow2Page = await newWindow2.newPage();

    await newWindow2Page.goto('https:', {
        waitUntil: 'networkidle'
    });

    const newWindow2header = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
        state: 'visible',
        timeOut: 10000
    });

    const newWindow2actual = (await newWindow2header.textContent() || '').trim();

    if(newWindow2actual === expectedTitle){
        console.log();
    }else{
        console.log();
    }

    await newWindow2.close();

}

(async () => {
    await runTest('TC1 - Verify welcome text', tc1);
    await runTest('TC1 - Verify welcome text', tc2);
    await runTest('TC1 - Verify welcome text', tc3);
})();