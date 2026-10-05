import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Using Search from Home page and after checking filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.decathlon.lv/");
    const accpetCookiesButton = page.getByRole("button", {
      name: "Piekrist un aizvērt",
    });
    await accpetCookiesButton.click();
  });

  test("Testing home page search", async ({ page }) => {
    const homePage = new HomePage(page);
    await test.step("Check if searching title equal to searching item ", async () => {
      await homePage.searchOnMainPage("bernu velosipedi");
    });
  });
    
    test("Filter check: Choose item check that filter was sorted and clean filter", async ({
      page,
    }) => {
      const homePage = new HomePage(page);

      await test.step("User select Pēc darbības ", async () => {
        await homePage.filterCheck();
      });

      await test.step("User select Velotrekings in filter menu", async () => {
        await homePage.selectVelotrekingsAndVerifyProductCount();
      })

      await test.step("Clean the filter ", async () => {
        await homePage.filterReset()
      });
    });
  });
