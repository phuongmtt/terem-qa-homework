import test from '../fixtures/customTest';
import urls from '../configs/urls';
import { TaskStatus } from '../configs/data';

const { describe, step } = test;

describe('Task Management Test', () => {
  let taskName = 'Test Task';

  // After each to clean up the created task
  test.afterEach(async ({ pageObjects: {taskManagementPage} }) => {
    try {
      // Check if the task exists and delete it
      let taskList = await taskManagementPage.getTaskList();
      if ((taskList.find(task => task === taskName))) {
        await taskManagementPage.clickDeleteTask(taskName);
      }
    } catch (e) {
      console.error(`Clean up error: ${e}`);
    }
  });

  test('Verify ability to create, complete and delete task', async ({ pageObjects: {taskManagementPage} }) => {
    await step('1. Open the Mini To-Do App and verify Home Page displayed', async () => {
      await taskManagementPage.open(urls.baseUrl);
      await taskManagementPage.verifyTaskListPageDisplayed();
      // Expect task list is empty
      await taskManagementPage.verifyNumberOfTasksFromScreen(0);
    });
        
    await step('2. Verify ability to create new task', async () => {
      await taskManagementPage.inputTaskText(taskName);
      await taskManagementPage.clickAddTask();
      // Verify task is added to task list from screen
      await taskManagementPage.verifyNumberOfTasksFromScreen(1);
      await taskManagementPage.verifyTaskIsDisplayedFromTaskList(taskName);
      // Verify task status is NEW
      await taskManagementPage.verifyTaskStatus(taskName, TaskStatus.NEW);
    });

    await step('3. Verify ability to complete created task', async () => {
      await taskManagementPage.clickCompleteTask(taskName);
      // Verify task list's length is still remaining 1
      await taskManagementPage.verifyNumberOfTasksFromScreen(1);
      await taskManagementPage.verifyTaskIsDisplayedFromTaskList(taskName);
      // Verify task status is COMPLETED
      await taskManagementPage.verifyTaskStatus(taskName, TaskStatus.COMPLETED);
    });

    await step('4. Verify ability to delete created task', async () => {
      await taskManagementPage.clickDeleteTask(taskName);
      // Verify task list's length is 0 after deletion
      await taskManagementPage.verifyNumberOfTasksFromScreen(0);
    });
  });
});
