import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { ProductPage } from "../pages/ProductPage";
import { test, expect } from "@playwright/test";

test.describe("Decathlon search by lowest bicycle price and add item to the cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.decathlon.lv/");
    const accpetCookiesButton = page.getByRole("button", {
      name: "Piekrist un aizvērt",
    });
    await accpetCookiesButton.click();
  });

  test("Decathlon test", async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    await test.step("Open Decathlon", async () => {
      await expect(page).toHaveTitle("Decathlon Latvija");
    });

    await test.step("Open bicycle category", async () => {
      await homePage.navigateToBicycles();
      await expect(page).toHaveURL(/3160-velosipedi/);
    });

    await test.step("Sort bicycles by lowest price and verify order", async () => {
      await searchPage.sortDropDownByLowestPrice();
      await expect(page).toHaveURL(/order=price_asc/);
      const allPrices = await searchPage.listOfPrices();
      const sortedPrices = [...allPrices].sort((a, b) => a - b);
      expect(allPrices).toEqual(sortedPrices);
    });

    await test.step("Check cheapest bicycle", async () => {
      const allPrices = await searchPage.listOfPrices();
      const firstPrice = allPrices[0];
      await expect(firstPrice).toBe(Math.min(...allPrices));
    });

    await test.step("Open first Bicycle and check correct bicycle", async () => {
      await searchPage.openFirstBicycle();
      // Add test on checking that we open the first product and check by the price
    });

    await test.step("Add product to the cart", async () => {
      await productPage.addAndCheckAmountOfProducts("2");
      await productPage.addToCart();
    });
    // Add test with check where we checking added item to the cart and sum 
  });
});
