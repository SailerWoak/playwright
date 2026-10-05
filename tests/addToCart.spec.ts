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

    await test.step("Verify Decathlon home page", async () => {
      await expect(page).toHaveTitle("Decathlon Latvija");
    });

    await test.step("Open bicycle category", async () => {
      await homePage.navigateToBicycles();
    });

    await test.step("Sort bicycles by lowest price and verify order", async () => {
      await searchPage.sortByLowestPriceAndVerify();
    });

    await test.step("Check cheapest bicycle", async () => {
      await searchPage.validateTheCheapestBicycle();
    });

    await test.step("Open first Bicycle and check correct bicycle", async () => {
      await searchPage.openFirstBicycleAndVerifyyPrice();
    });

    await test.step("Add amount of product and add to cart", async () => {
      await productPage.addAndCheckAmountOfProducts("2");
      await productPage.addItemToCart();
    
      await page.getByTestId('price-detail-total')
    });

    await test.step("Open shopping bag", async () => {
      await productPage.openShoppingBag();
    }); 
  });
});
