import { Page, expect } from '@playwright/test';
import { AbstractPage } from "../abstractPage";
import { inputByAttributeValue, buttonByAttributeValue, listByAttributeValue, listItemByText, header } from '../../helpers/selectors';
import { TaskStatus } from '../../configs/data';

class HomePage extends AbstractPage {

    constructor(page: Page) {
        super(page)
    }
    // Element locators
    private elements = {
        // Title
        lbl_title: header('Mini To-Do App'),
        // Task input
        txt_enter_task: inputByAttributeValue('id', 'taskInput'),
        // Add task button
        btn_add_task: buttonByAttributeValue('id', 'addBtn'),
        // Task item and buttons
        itm_task: `${listByAttributeValue('id', 'taskList')}/li`,
        itm_task_by_name: (taskName: string) => {
            let container = listItemByText(taskName);
            return {
                container: container,
                btn_complete: container + buttonByAttributeValue('class', 'complete-btn'),
                btn_delete: container + buttonByAttributeValue('class', 'delete-btn'),
            }
        }
    };

    public async isLoaded() {
        await this.page.waitForLoadState();
    }

    public async isTitleDisplayed(): Promise<boolean> {
        return await this.page.isVisible(this.elements.lbl_title);
    }

    public async inputTaskText(text: string): Promise<void> {
        await this.page.fill(this.elements.txt_enter_task, text);
    }

    public async clickAddTask(): Promise<void> {
        await this.page.click(this.elements.btn_add_task);
    }

    public async createTask(taskName: string): Promise<void> {
        await this.inputTaskText(taskName);
        await this.clickAddTask();
    }

    public async getTaskStatus(taskName: string): Promise<string> {
        const locator = this.page.locator(this.elements.itm_task_by_name(taskName).container);
        const classAttr = await locator.getAttribute('class');
        let taskStatus = "";
        if (! classAttr) {
            taskStatus = TaskStatus.NEW;
        } else if (classAttr === TaskStatus.COMPLETED) {
            taskStatus = TaskStatus.COMPLETED;
        }
        console.log(`Task "${taskName}" status from screen: ${taskStatus}`);
        return taskStatus;
    }

    public async isTaskVisible(taskName: string): Promise<boolean> {
        return await this.page.isVisible(this.elements.itm_task_by_name(taskName).container);
    }

    public async isButtonCompleteVisible(taskName: string): Promise<boolean> {
        return await this.page.isVisible(this.elements.itm_task_by_name(taskName).btn_complete);
    }

    public async clickCompleteTask(taskName: string): Promise<void> {
        await this.page.click(this.elements.itm_task_by_name(taskName).btn_complete);
    }

    public async clickDeleteTask(taskName: string): Promise<void> {
        await this.page.click(this.elements.itm_task_by_name(taskName).btn_delete);
    }

    public async isButtonDeleteVisible(taskName: string): Promise<boolean> {
        return await this.page.isVisible(this.elements.itm_task_by_name(taskName).btn_delete);
    }

    public async verifyTaskStatus(taskName: string, status: TaskStatus): Promise<void> {
        expect.soft(await this.isTaskVisible(taskName)).toBeTruthy();
        expect.soft(await this.isButtonCompleteVisible(taskName)).toBeTruthy();
        expect.soft(await this.isButtonDeleteVisible(taskName)).toBeTruthy();
        expect.soft(await this.getTaskStatus(taskName)).toBe(status);
    }

    public async getTaskList(): Promise<string[]> {
        const taskList = await this.page.$$eval(this.elements.itm_task, (lis) => {
            return lis.map(li => {
                return Array.from(li.childNodes)
                    .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim().length > 0)
                    .map(node => node.textContent ? node.textContent.trim() : '')
                    .join('').trim();
                })
            }
        );

        console.log('All displaying tasks from screen:', taskList);
        return taskList;
    }

    public async verifyTaskListPageDisplayed(): Promise<void> {
        expect.soft(await this.isTitleDisplayed()).toBeTruthy();
    }

    public async verifyNumberOfTasksFromScreen(expectedCount: number): Promise<void> {
        const taskList = await this.getTaskList();
        expect.soft(taskList.length).toBe(expectedCount);
    }

    public async verifyTaskIsDisplayedFromTaskList(taskName: string): Promise<void> {
        let taskListFromScreen = await this.getTaskList();
        expect.soft(taskListFromScreen.find(task => task === taskName)).toBeDefined();
    }

}


export default HomePage;