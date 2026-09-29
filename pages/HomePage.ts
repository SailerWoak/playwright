import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly sportsButton: Locator;
    readonly bicycleLink: Locator;
    readonly practiceFilter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sportsButton = page.getByRole("button", { name: "Sports" });
        this.bicycleLink = page.getByRole("link", {
            name: "Velosipēdi",
            exact: true,
        });
        this.practiceFilter = page.getByTestId("practice-facet");
    }

    async open() {
        await this.page.goto("https://www.decathlon.lv/");
    }

    async navigateToBicycles() {
        await this.sportsButton.click();
        await this.bicycleLink.click();
    }

    async searchOnMainPage(searchText: string) {
        await this.page.getByTestId("search-popover-trigger").click();
        const searchField = this.page.getByRole("combobox", { name: "Meklēt" });
        await searchField.fill(searchText);
        await searchField.press("Enter");
    }
    async filterCheck() {
        await this.page.goto(
            "https://www.decathlon.lv/search/?query=bernu+velosipedi",
        );
        await this.practiceFilter.click();
    }
    async getVelotrekingsCount() {
        return await this.practiceFilter
            .locator(
                'li[data-filter-value="VELOTREKINGS"] span[aria-hidden="true"]',
            )
            .textContent();
    }
}
