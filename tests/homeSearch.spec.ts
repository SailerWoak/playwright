import { test, expect } from "@playwright/test";
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
    await test.step("Search on Home Page", async () => {
      await homePage.searchOnMainPage("bernu velosipedi");
      await expect(page.getByTestId("listing-page-title")).toHaveText(
        "Jūs meklējāt: bernu velosipedi",
      );
    });
  });
  test("Filter check: Choose item check that filter was sorted and clean filter", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    let filterCount: string | null;

    await test.step("User select Pēc darbības ", async () => {
      await homePage.filterCheck();
    });

    await test.step("User select Velotrekings in filter menu", async () => {
      const veloTrekingsLabel = homePage.practiceFilter
        .locator("label")
        .filter({ hasText: "Velotrekings" });

      filterCount = await homePage.getVelotrekingsCount();
      await veloTrekingsLabel.click();
      await expect(veloTrekingsLabel).toBeChecked();
    });

    await test.step("Check that sorted item has same count as product count", async () => {
       const  productCount = await page.getByTestId("products-count");
      await expect(productCount).toHaveText(`${filterCount} produkti`);
    });
    
    await test.step('Clean the filter ', async () =>{
       const resetFilter = page.getByTestId('reset-filters')
       const  productCount = page.getByTestId("products-count");

       await expect(resetFilter).toHaveText(/Atiestatīt filtrus/)
       await resetFilter.click();
       await expect(productCount).not.toHaveText(`${filterCount} produkti`)
       await expect(resetFilter).not.toBeVisible();
    })
  });
});
