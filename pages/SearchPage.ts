import { expect, Locator, Page } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productCards: Locator;
    readonly prices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.getByTestId('sort-by').locator('select');
        this.productCards = page.getByTestId('products-list').locator('li.js-product-card');
        this.prices = this.productCards.locator('.price_items');
    }

    async searchLink() {
        await this.page.goto('https://www.decathlon.lv/3160-velosipedi?order=price_asc');
    }
    async sortByLowestPrice() {
        await expect(this.sortDropdown).toBeVisible();
        await this.sortDropdown.selectOption({ label: 'Zemākā Cena' });
        await expect(this.sortDropdown).toHaveValue('price_asc');
    }

    async checkFirstProductPrice(expectedPrice: string) {
        await expect(this.prices.first()).toContainText(expectedPrice);
    }
    async openFirstBicycle() {
        await this.productCards.first().click();
    }
}
