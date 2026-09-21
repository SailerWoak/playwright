import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly addItemButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByTestId("add-to-cart-button");
        this.addItemButton = page.locator('.js-quantity-stepper-increase-button');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
    async productPage() {
        await this.page.goto('https://www.decathlon.lv/p/360329-502880-bernu-lidzsvara-velosipeds-learn-100-balts.html');
    }
    async addAndCheckAmountOfProducts(expectedCount: string) {
        await this.addItemButton.click();
        const productCountInput = await this.page.getByRole('spinbutton');
        await expect(productCountInput).toHaveValue(expectedCount);
    }
    async addToCard() {
        await this.addToCartButton.click();
    }
}
