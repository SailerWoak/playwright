
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { test, expect } from '@playwright/test';


test.describe("Decathlon search by lowest bicycle price and add item to the cart", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.decathlon.lv/');
    const accpetCookiesButton = page.getByRole('button', { name: 'Piekrist un aizvērt' });
    await accpetCookiesButton.click();
  });

  test('Decathlon test', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    await test.step('Open Decathlon', async () => {
      await expect(page).toHaveTitle("Decathlon Latvija");
    });

    await test.step('Open bicycle category', async () => {
      await homePage.navigateToBicycles();
    });

    await test.step('Sort bicycles by lowest price', async () => {
      await searchPage.sortByLowestPrice();
    });

    await test.step('Check cheapest bicycle', async () => {
      await searchPage.checkFirstProductPrice('35,00');
      await searchPage.openFirstBicycle();
    });

    await test.step('Check product page', async () => {
      await productPage.productPage();
      await expect(page).toHaveTitle('Bērnu līdzsvara velosipēds “Learn 100”, balts - Decathlon');
    });

    await test.step('Add product to the cart', async () => {
      await productPage.addAndCheckAmountOfProducts('2');
      await productPage.addToCart();
    })
  });
});





test('Extracting values', async ({ page }) => {
  //extracting text
  const basicFormSelection = page.locator('nb-card', {hasText: 'Basic Form'})
  const submitButton = await basicFormSelection.getByRole('button').textContent();
  expect(submitButton).toEqual('Submit');

  //extract multiple text values
  const allRadioButtonValues = await page.locator('nb-radio').allInnerTexts();
  expect(allRadioButtonValues).toEqual(['Option 1', 'Option 2']);

  //extract input field values
  const emailFieled = basicFormSelection.getByRole('textbox', {name: 'Email'});
  await emailFieled.fill('test@test.com');
  const emailFieldValue = await emailFieled.inputValue();
  console.log(emailFieldValue);

  //extract attribute value
  const emailPlaceHolder = await emailFieled.getAttribute('placeholder');
  console.log(emailPlaceHolder);
})