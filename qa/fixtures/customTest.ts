import { Page, test as base } from '@playwright/test';
import pageFactory from '../pages/pageFactory';

type CustomTest = {
  page: Page;
  pageObjects: ReturnType<typeof pageFactory>;
};

const customTest = base.extend<CustomTest>({
  pageObjects: async ({ page }, use: any) => {
    await use(pageFactory(page));
  },
});

export default customTest;
