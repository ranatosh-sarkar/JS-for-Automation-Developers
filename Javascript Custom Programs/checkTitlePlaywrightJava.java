import com.microsoft.playwright.*;
import com.microsoft.playwright.options.WaitUntilState;

public class CheckTitle {
  public static void main(String[] args) {
    // Playwright.create() sets up the Playwright runtime
    try (Playwright playwright = Playwright.create()) {

      // Equivalent of: const { chromium } = require('playwright'); chromium.launch({ headless: false });
      Browser browser = playwright.chromium().launch(
        new BrowserType.LaunchOptions().setHeadless(false)
      );

      BrowserContext context = browser.newContext();
      Page page = context.newPage();

      // Go to the page and wait for networkidle (like waitUntil: 'networkidle')
      page.navigate("https://automationintesting.online/",
        new Page.NavigateOptions().setWaitUntil(WaitUntilState.NETWORKIDLE)
      );

      String welcomeH1XPath =
        "//*[@id=\"root-container\"]/div/section[1]/div/div/div/h1";

      // This is like: const h1Element = await page.waitForSelector(xpath, { state: 'visible', timeout: 10000 });
      Locator h1 = page.locator(welcomeH1XPath);
      h1.waitFor(); // default is visible; 10s timeout by default

      // Like: const actualWelcome = await page.evaluate(el => el && el.textContent, h1Element);
      String actualWelcome = h1.textContent();
      if (actualWelcome == null) {
        actualWelcome = "";
      }
      actualWelcome = actualWelcome.replaceAll("\\s+", " ").trim();

      String expectedWelcome = "Welcome to Shady Meadows B&B";

      System.out.println("actualWelcome: " + actualWelcome);

      // Similar comparison logic
      if (actualWelcome.equals(expectedWelcome)) {
        System.out.println("Welcome text verified: " + actualWelcome);
      } else {
        System.err.println("Failed.");
      }

      // Rough equivalent of page.pause() → lets you see the browser before closing
      System.out.println("Press Enter to close the browser...");
      try {
        System.in.read();
      } catch (Exception ignored) {
      }

      browser.close();
    }
  }
}
