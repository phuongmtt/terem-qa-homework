import { IPage } from "./IPage"
import { Page } from '@playwright/test';

export abstract class AbstractPage implements IPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    abstract isLoaded(): Promise<void>

    public async open(url: string) {
        await this.page.goto(url);
        await this.isLoaded();
    }

    public async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }
}