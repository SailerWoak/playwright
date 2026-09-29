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

    async listOfPrices() {
        return await this.prices.evaluateAll((elements) =>
            elements.map((element) =>
                Number(element.getAttribute("data-value")),
            ),
        );
    }
    async openFirstBicycle() {
        await this.productCards.first().click();
    }
}
