to execute:
javac -cp ".;selenium-server-standalone-2.53.0.jar" CheckTitleSelenium.java
java --add-opens java.base/java.lang=ALL-UNNAMED -cp ".;selenium-server-standalone-2.53.0.jar" CheckTitleSelenium

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CheckTitleSelenium {
  public static void main(String[] args) throws Exception {
    // Point Selenium to chromedriver.exe in the current folder
    String driverPath = System.getProperty("user.dir") + "\\chromedriver.exe";
    System.setProperty("webdriver.chrome.driver", driverPath);

    WebDriver driver = new ChromeDriver();
    try {
      driver.get("https://automationintesting.online/");

      String welcomeH1XPath =
        "//*[@id=\"root-container\"]/div/section[1]/div/div/div/h1";

      // Explicit wait up to 10 seconds for the H1 to be visible
      WebDriverWait wait = new WebDriverWait(driver, 10); // Selenium 2.x style
      WebElement h1 = wait.until(
        ExpectedConditions.visibilityOfElementLocated(By.xpath(welcomeH1XPath))
      );

      String actualWelcome = h1.getText().replaceAll("\\s+", " ").trim();
      String expectedWelcome = "Welcome to Shady Meadows B&B";

      System.out.println("actualWelcome: " + actualWelcome);

      if (actualWelcome.equals(expectedWelcome)) {
        System.out.println("Welcome text verified: " + actualWelcome);
      } else {
        System.err.println("Failed.");
      }

      System.out.println("Press Enter to close browser...");
      System.in.read(); // pause so you can see the browser
    } finally {
      try {
        driver.quit();
      } catch (Exception e) {
        System.err.println("Error closing browser: " + e.getMessage());
      }
    }
  }
}
