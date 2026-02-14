// Run from terminal: open folder where this file exists, then: node checkTitlePlaywrightJS.js
//  - "node" is the Node.js runtime.
//  - "checkTitlePlaywrightJS.js" is this file's name. Node will execute this JS file.

// Import Playwright
//  - "const" declares a constant (cannot be reassigned).
//  - "{ chromium }" is ES6 object destructuring: we only take the "chromium" property from the exported object.
//  - "require('playwright')" loads the Playwright library (CommonJS import).
//    (In this file we're using ES module style, but the idea is the same: we only import `chromium`.)
import { chromium } from 'playwright';

// Import locators
//  - We import all exports from our own module './amazonLocators.js' as a single namespace object.
//  - "./" means "from the current folder".
//  - Each constant (WELCOME_AMAZON_XPATH, heroImageXpath, etc.) is then accessed as amazonLocators.WELCOME_AMAZON_XPATH, etc.
import * as amazonLocators from '../amazonLocators.js';

// Expected text
//  - A constant string that we will use in assertions/comparisons.
const EXPECTED_WELCOME_TEXT = 'Welcome to Amazon.ie';

// --------------------------
// Common helper functions
// --------------------------

// "/** ... */" defines a block comment, often used for JSDoc-style documentation.
/**
 * Common runner: launch browser, open context + page,
 * go to Amazon.ie, run a specific test case, then close browser.
 */

// "async" marks this function as asynchronous, so it can use "await".
async function runTest(testName, testFn) {
  // console.log outputs text to the terminal.
  //  - "\n" is a newline.
  //  - Backticks (`) define a template literal (ES6) which allows embedding variables using ${}.
  console.log(`\n================ ${testName} ================`);

  // "chromium.launch" starts a new browser instance using the Chromium engine.
  //  - "await" pauses execution until the Promise resolves and returns the browser object.
  //  - "{ headless: false }" is an options object; headless:false opens a visible browser window.
  const browser = await chromium.launch({ headless: false });

  // "browser.newContext()" creates an isolated browser context (like a new browser profile).
  //  - Each context can hold multiple tabs (pages).
  const context = await browser.newContext();

  // "context.newPage()" opens a new tab/page inside this context.
  const page = await context.newPage();

  // Common navigation for all test cases
  // "page.goto(url, options)" navigates the page to the given URL.
  //  - 'https://www.amazon.ie/' is the target website.
  //  - "waitUntil: 'networkidle'" tells Playwright to wait until network is mostly idle
  //    (no new network connections for a short time) before resolving.
  await page.goto('https://www.amazon.ie/', {
    waitUntil: 'networkidle'
  });

  // "try { ... } catch (err) { ... } finally { ... }" is a standard JS error-handling construct.
  //  - "try" block executes normally.
  //  - "catch" runs if an error is thrown inside try.
  //  - "finally" always runs, whether error or not.
  try {
    // "testFn" is a variable/parameter that references a function passed in (e.g., tc1_verifyWelcomeText)
    // await testFn({ browser, context, page }) points and executes async function tc1_verifyWelcomeText({ page })
    // We call it and pass an object with { browser, context, page }
    // This uses ES6 shorthand { browser, context, page } instead of { browser: browser, context: context, page: page }.
    await testFn({ browser, context, page });
    console.log(` ${testName} completed`);
  } catch (err) {
    // "console.error" logs an error message.
    // "err.message" is the error's human-readable message.
    console.error(`${testName} failed:`, err.message);

    // Take screenshot on failure (update path for your user)
    // "page.screenshot(options)" takes a screenshot.
    //  - "path" gives an absolute path where the PNG will be saved.
    //  - "fullPage: true" means capture entire page, not just visible viewport.
    await page.screenshot({
      path: `C:\\Users\\YOUR_USER\\Downloads\\ss\\${testName}-failed.png`,
      fullPage: true
    });
    console.log(`Screenshot saved to C:\\Users\\YOUR_USER\\Downloads\\ss\\${testName}-failed.png`);
  } finally {
    // Always close the browser for this test
    // "browser.close()" closes the entire browser instance and all contexts/tabs.
    await browser.close();
  }
}

/**
 * Reusable helper: scroll to any element by selector (XPath/CSS)
 */
// "scrollToElement" is an async function taking:
// - "page": the Playwright Page object
// - "selector": string (XPath or CSS selector)
// - "description": optional param with default value 'Shopping benefits on Amazon.ie'
async function scrollToElement(page, selector, description = 'Shopping benefits on Amazon.ie') {
  // "page.waitForSelector" waits for an element matching the selector.
  //  - "state: 'visible'" waits until the element is visible in the DOM.
  //  - "timeout: 10000" sets max wait to 10 seconds (10000 ms).
  const el = await page.waitForSelector(selector, {
    state: 'visible',
    timeout: 10000
  });

  // "el.scrollIntoViewIfNeeded()" scrolls the element into view only if it's not visible.
  // This uses Playwright's built-in helper on the ElementHandle.
  await el.scrollIntoViewIfNeeded();

  // Log a message showing where we scrolled.
  console.log(`Scrolled to: ${description}`);

  // Optional for debugging; comment out if you don't want pauses
  // "page.pause()" opens Playwright Inspector to pause execution (debug mode) if running with PW debug tools.
  // await page.pause();
}

// --------------------------
// Test Case 1: Verify welcome text
// --------------------------

// Define an async test case function that destructures "page" from the argument object.
// The caller passes { browser, context, page } but we only need page here.
async function tc1_verifyWelcomeText({ page }) {
  // Wait for the welcome element using its XPath locator from amazonLocators.js.
  const h1Element = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
    state: 'visible',
    timeout: 10000
  });

  // Get the text content of the element:
  //  - "h1Element.textContent()" returns a Promise that resolves to a string or null.
  //  - "await" to get the value.
  //  - "|| ''" means: if the result is null/undefined/falsey, use empty string instead.
  //  - ".trim()" removes extra whitespace at start and end.
  const actualWelcome = (await h1Element.textContent() || '').trim();

  // Log what we actually read from the page.
  console.log('TC1 - actualWelcome:', actualWelcome);

  // Compare actual vs expected.
  // "===" is strict equality (compares value & type).
  if (actualWelcome === EXPECTED_WELCOME_TEXT) {
    console.log('TC1 - Welcome text verified:', actualWelcome);
  } else {
    // Template literal showing both expected and actual values for debugging.
    console.error(
      `TC1 - Failed: expected "${EXPECTED_WELCOME_TEXT}", got "${actualWelcome}"`
    );
  }

  // Pause the page for debug viewing.
  await page.pause();
}

// --------------------------
// Test Case 2: Click hero link, verify image, URL, scroll & login hover
// --------------------------

// Another async test case, only needs "page".
async function tc2_clickAndInteract({ page }) {
  // Click welcomeAmazonText
  await page.locator(amazonLocators.WELCOME_AMAZON_XPATH).click();

  // Hero image
  // Wait for the hero image to appear using its XPath.
  await page.waitForSelector(amazonLocators.heroImageXpath, {
    state: 'visible',
    timeout: 10000
  });
  console.log('TC2 - Hero image is visible.');

  // Verify URL
  // "page.url()" returns the current URL as a string.
  const currentUrl = page.url();
  // "includes('amazon.ie')" checks if substring "amazon.ie" exists in the URL.
  if (currentUrl.includes('amazon.ie')) {
    console.log('TC2 - URL contains "amazon.ie":', currentUrl);
  } else {
    console.error('TC2 - URL does NOT contain "amazon.ie":', currentUrl);
  }

  // Scroll to "Shopping benefits on Amazon.ie"
  // Call our helper function with page, locator, and description.
  await scrollToElement(page, amazonLocators.shoppingBenefitsXpath, 'Shopping benefits on Amazon.ie');

  // Hover on Account & Lists
  // Wait for the "Account & Lists" element.
  const accountListEl = await page.waitForSelector(amazonLocators.accountListXpath, {
    state: 'visible',
    timeout: 10000
  });

  // ".hover()" moves the mouse pointer over the element.
  await accountListEl.hover();
  console.log('TC2 - Hovered on "Account & Lists".');

  // Click Sign in
  // Wait for the "Sign in" element inside the hover dropdown.
  const signInEl = await page.waitForSelector(amazonLocators.signInXpath, {
    state: 'visible',
    timeout: 10000
  });

  // Click the "Sign in" element.
  await signInEl.click();
  console.log('TC2 - Clicked "Sign in".');

  // Enter text in email / mobile field
  // Wait for the email/mobile input field.
  const emailEl = await page.waitForSelector(amazonLocators.emailXpath, {
    state: 'visible',
    timeout: 10000
  });
  // ".fill(value)" clears the input and types the given value.
  await emailEl.fill('870376973');
  console.log('TC2 - Filled email / mobile field.');

  // Pause for debugging so you can inspect state.
  await page.pause();
}

// --------------------------
// Test Case 3: Tabs and Windows
// --------------------------

// Here we need browser, context, and page, so destructure all three.
async function tc3_tabsAndWindows({ browser, context, page }) {
  // ------- TAB 2 -------
  // "context.newPage()" opens a new tab within the same browser context.
  const tabPage2 = await context.newPage();
  // Navigate TAB 2 to amazon.ie.
  await tabPage2.goto('https://www.amazon.ie/', { waitUntil: 'networkidle' });

  // Wait for welcome text in TAB 2.
  const tabWelcome2 = await tabPage2.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
    state: 'visible',
    timeout: 10000
  });

  // Read the text in TAB 2.
  const tabWelcomeText2 = (await tabWelcome2.textContent() || '').trim();
  if (tabWelcomeText2 === EXPECTED_WELCOME_TEXT) {
    console.log('TC3 - TAB2 welcome text OK:', tabWelcomeText2);
  } else {
    console.log('TC3 - TAB2 welcome text MISMATCH. Got:', tabWelcomeText2);
  }

  // Pause TAB 2 for debugging (optional).
  await tabPage2.pause(); // optional

  // ------- TAB 3 -------
  // Open another new tab (TAB 3).
  const tabPage3 = await context.newPage();
  await tabPage3.goto('https://www.amazon.ie/', { waitUntil: 'networkidle' });

  // Wait for welcome text in TAB 3.
  const tabWelcome3 = await tabPage3.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
    state: 'visible',
    timeout: 10000
  });

  // Read the text in TAB 3.
  const tabWelcomeText3 = (await tabWelcome3.textContent() || '').trim();
  if (tabWelcomeText3 === EXPECTED_WELCOME_TEXT) {
    console.log('TC3 - TAB3 welcome text OK:', tabWelcomeText3);
  } else {
    console.log('TC3 - TAB3 welcome text MISMATCH. Got:', tabWelcomeText3);
  }

  // Pause TAB 3 for debugging (optional).
  await tabPage3.pause(); // optional

  // Switch back to original TAB 1
  // "page.bringToFront()" makes this page's tab active in the browser.
  // await tabPage2.bringToFront(); -- can also switch to middle page i.e. page2
  await page.bringToFront();
  console.log('TC3 - Switched to TAB1 (original).');

  // Check welcome text again on original TAB 1.
  const tab1Welcome = await page.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
    state: 'visible',
    timeout: 10000
  });
  const tab1WelcomeText = (await tab1Welcome.textContent() || '').trim();

  if (tab1WelcomeText === EXPECTED_WELCOME_TEXT) {
    console.log('TC3 - TAB1 welcome text OK:', tab1WelcomeText);
  } else {
    console.log('TC3 - TAB1 welcome text MISMATCH. Got:', tab1WelcomeText);
  }

  await page.pause(); // optional

  // Switch to last tab (TAB 3)
  await tabPage3.bringToFront();
  console.log('TC3 - Switched to TAB3 (last tab).');

  // Re-check welcome text in TAB 3 (again).
  const tab3WelcomeAgain = await tabPage3.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
    state: 'visible',
    timeout: 10000
  });
  const tab3WelcomeAgainText = (await tab3WelcomeAgain.textContent() || '').trim();

  if (tab3WelcomeAgainText === EXPECTED_WELCOME_TEXT) {
    console.log('TC3 - TAB3 (again) welcome text OK:', tab3WelcomeAgainText);
  } else {
    console.log('TC3 - TAB3 (again) welcome text MISMATCH. Got:', tab3WelcomeAgainText);
  }

  await tabPage3.pause(); // optional

  // ------- New WINDOW (new context) -------
  // "browser.newContext()" creates an entirely new browser context (like a new incognito window).
  const windowContext = await browser.newContext();
  // "windowContext.newPage()" opens a page in that new window/context.
  const windowPage = await windowContext.newPage();

  // Navigate to amazon.ie in the new window.
  await windowPage.goto('https://www.amazon.ie/', {
    waitUntil: 'networkidle'
  });

  // Wait for welcome text in the new window.
  const windowWelcome = await windowPage.waitForSelector(amazonLocators.WELCOME_AMAZON_XPATH, {
    state: 'visible',
    timeout: 10000
  });

  // Read that text and log it.
  const windowWelcomeText = (await windowWelcome.textContent() || '').trim();
  console.log('TC3 - New WINDOW welcome text:', windowWelcomeText);

  // Optional debug
  // await windowPage.pause();

  // Close the new window context.
  await windowContext.close();
}

// --------------------------
// Extra helpers: frame, dropdown, right-click
// --------------------------

// Helper to click inside an iframe.
// "frameName" comes from the iframe's "name" attribute.
async function switchFrame(page, frameName, selector) {
  // "page.frame({ name: frameName })" finds a Frame object by its name.
  const frame = page.frame({ name: frameName });

  // If frame is not found (null/undefined), throw an error.
  if (!frame) {
    throw new Error(`Frame with name "${frameName}" not found`);
  }

  // Wait for the element inside that frame.
  await frame.waitForSelector(selector, {
    state: 'visible',
    timeout: 10000
  });

  // Click the element found in the frame.
  await frame.click(selector);
  console.log(`Clicked "${selector}" inside frame "${frameName}"`);
}

// Helper to select an option from a dropdown.
async function selectDropdownOption(page, dropdownSelector, optionValue) {
  // Wait for the dropdown element to be visible.
  await page.waitForSelector(dropdownSelector, {
    state: 'visible',
    timeout: 10000
  });

  // "page.selectOption(selector, value)" selects the option whose value attribute equals optionValue.
  await page.selectOption(dropdownSelector, optionValue);
  console.log(`Selected value "${optionValue}" in dropdown "${dropdownSelector}"`);
}

// Helper to perform a right-click on an element.
async function rightClickElement(page, selector) {
  // Wait for the target element.
  await page.waitForSelector(selector, {
    state: 'visible',
    timeout: 10000
  });

  // "page.click(selector, { button: 'right' })" simulates a right mouse button click (context click).
  await page.click(selector, { button: 'right' });
  console.log(`Right-clicked on element "${selector}"`);
}

// --------------------------
// Main runner: execute all test cases sequentially
// --------------------------

// This is an IIFE (Immediately Invoked Function Expression):
//  - "(async () => { ... })()" defines an async arrow function and immediately calls it.
//  - This allows us to use "await" at the top level.
(async () => {
  // Run test case 1 using common runner.
  await runTest('TC1 - Verify welcome text', tc1_verifyWelcomeText);
  // Run test case 2.
  await runTest('TC2 - Click hero & interact', tc2_clickAndInteract);
  // Run test case 3.
  await runTest('TC3 - Tabs and Windows', tc3_tabsAndWindows);
})();

