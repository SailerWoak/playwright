import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly sportsButton: Locator;
    readonly bicycleLink: Locator;
    readonly practiceFilter: Locator;
    readonly productCount: Locator;
    private filterCount: string | null = null;

    constructor(page: Page) {
        this.page = page;
        this.sportsButton = page.getByRole("button", { name: "Sports" });
        this.bicycleLink = page.getByRole("link", {
            name: "Velosipēdi",
            exact: true,
        });
        this.practiceFilter = page.getByTestId("practice-facet");
        this.productCount = page.getByTestId("products-count")
    }

    async open() {
        await this.page.goto("https://www.decathlon.lv/");
    }

    async navigateToBicycles() {
        await this.sportsButton.click();
        await this.bicycleLink.click();
        await expect(this.page).toHaveURL(/3160-velosipedi/);
    }

    async searchOnMainPage(searchText: string) {
        await this.page.getByTestId("search-popover-trigger").click();
        const searchField = this.page.getByRole("combobox", { name: "Meklēt" });
        await searchField.fill(searchText);
        await searchField.press("Enter");
        await expect(this.page.getByTestId("listing-page-title")).toHaveText(
            `Jūs meklējāt: ${searchText}`,
        );
    }
    async filterCheck() {
        await this.page.goto(
            "https://www.decathlon.lv/search/?query=bernu+velosipedi",
        );
        await this.practiceFilter.click();
    }

    async selectVelotrekingsAndVerifyProductCount() {
        const filterCount = await this.getVelotrekingsCount();
        const veloTrekingsLabel = this.practiceFilter
            .locator("label")
            .filter({ hasText: "Velotrekings" });

        await veloTrekingsLabel.click();
        await expect(veloTrekingsLabel).toBeChecked();

        await expect(this.productCount).toHaveText(`${filterCount} produkti`);
    }

    async filterReset() {
        const resetFilter = this.page.getByTestId("reset-filters");

        await expect(resetFilter).toHaveText(/Atiestatīt filtrus/);
        await resetFilter.click();
        await expect(this.productCount).not.toHaveText(
            `${this.filterCount} produkti`,
        );
        await expect(resetFilter).not.toBeVisible();
    }
    async getVelotrekingsCount() {
        return await this.practiceFilter
            .locator(
                'li[data-filter-value="VELOTREKINGS"] span[aria-hidden="true"]',
            )
            .textContent();
    }
}
