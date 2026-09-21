import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly sportsButton: Locator;
    readonly bicycleLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sportsButton = page.getByRole('button', { name: 'Sports' });
        this.bicycleLink = page.getByRole('link', { name: 'Velosipēdi', exact: true });

    }

    async open() {
        await this.page.goto('https://www.decathlon.lv/');
    }

    async navigateToBicycles() {
        await this.sportsButton.click();
        await this.bicycleLink.click();
    }
}


