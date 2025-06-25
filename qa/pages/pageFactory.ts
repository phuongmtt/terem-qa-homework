import { Page } from '@playwright/test';
import TaskManagementPage from './web/taskManagementPage';

export default (page: Page) => ({
    taskManagementPage: new TaskManagementPage(page),
});
  