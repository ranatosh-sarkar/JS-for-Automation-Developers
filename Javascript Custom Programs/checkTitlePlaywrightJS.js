// checkTitle.js to run in cmd -- node checkTitle.js (open the terminal where file is present)
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://automationintesting.online/', {
    waitUntil: 'networkidle'
  });

  const welcomeH1XPath =
    '//*[@id="root-container"]/div/section[1]/div/div/div/h1';

  const h1Element = await page.waitForSelector(welcomeH1XPath, {
    state: 'visible',
    timeout: 10000
  });

  const actualWelcomeRaw = await page.evaluate(
    el => el.textContent || '',
    h1Element
  );

  // const actualWelcome = actualWelcomeRaw.replace(/\s+/g, ' ').trim();
  const actualWelcome = await page.evaluate(el => el && el.textContent, h1Element);
  const expectedWelcome = 'Welcome to Shady Meadows B&B';
  
  console.log('actualWelcome:', actualWelcome);
  
  await page.pause();

  if (actualWelcome === expectedWelcome) {
    console.log('Welcome text verified:', actualWelcome);
  } else {
    console.error('Failed.');
  }

  await browser.close();
})();
