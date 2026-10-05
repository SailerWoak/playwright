import { expect, Locator, Page } from "@playwright/test";

export class SearchPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productCards: Locator;
    readonly prices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.getByTestId("sort-by").locator("select");
        this.productCards = page.getByTestId("products-list");
        this.prices = this.productCards.getByTestId("current-price");
    }

    async searchLink() {
        await this.page.goto(
            "https://www.decathlon.lv/3160-velosipedi?order=price_asc",
        );
    }
    async sortDropDownByLowestPrice() {
        await expect(this.sortDropdown).toBeVisible();
        await this.sortDropdown.selectOption({ label: "Zemākā Cena" });
        await expect(this.sortDropdown).toHaveValue("price_asc");
        await Promise.all([
            this.page.waitForURL(/order=price_asc/),
            this.sortDropdown.dispatchEvent("change"),
        ]);
    }

    async sortByLowestPriceAndVerify() {
        await this.sortDropDownByLowestPrice();
        await expect(this.page).toHaveURL(/order=price_asc/);
        const allPrices = await this.getProductPrices();
        const sortedPrices = [...allPrices].sort((a, b) => a - b);
        expect(allPrices).toEqual(sortedPrices);
    }

    async getProductPrices() {
        return this.prices.evaluateAll((elements) =>
            elements.map((element) =>
                Number(element.getAttribute("data-value")),
            ),
        );
    }

    async validateTheCheapestBicycle() {
        const allPrices = await this.getProductPrices();
        const firstPrice = allPrices[0];
        await expect(firstPrice).toBe(Math.min(...allPrices));
    }

    async openFirstBicycleAndVerifyyPrice() {
        const allPrices = await this.getProductPrices();
        const firstPrice = allPrices[0];
        await this.productCards
            .locator('ul[class="js-product-list"] li')
            .first()
            .click();
        const productPrice = Number(
            await this.page
                .getByTestId("product-price-block")
                .getAttribute("data-price-amount"),
        );
        await expect(firstPrice).toEqual(productPrice);
    }
}
