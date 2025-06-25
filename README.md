## 1. terem-qa-homework
    - .github
        - workflows
            playwright.yml
            pull_request_template.md
    - qa
        - configs
            - data.ts
            - urls.ts
        - fixtures
            - customTest.ts
        - helpers
            - selectors.ts
        - pages
            - web
                - taskManagementPage.ts
            - abstractPage.ts
            - IPage.ts
            - pageFactory.ts
        - tests
            - taskManagement.spec.ts
    - playwright.config.ts
    - README.md
---
Test script are stored under folder 'qa' in the same repository with dev's code

## 2. Naming 
### File and folder names
- Short and descriptive
- Text based format with file extension **".ts"**
- File and folder names should be **'lowercase'** and the first letter of each word should be **'uppercase'** except for the first word
    + For example **taskManagement.spec.ts**

### Fucntion name
- Descriptive but not too long
- Should be **'lowercase'** and the first letter of each word should be **'uppercase'** except for the first word
    For example **verifyTaskStatus**

### Variable name
- Descriptive but not too long
- Should be **'lowercase'** with **'underscore'** separator (snake_case)
- Page object locator should starts with element type in 3 characters
  - Example
    - lbl_title
    - txt_enter_task
    - btn_add_task
    - itm_task
    - ...

## Page Object Locator Variable Pattern

| Locator       | Abbreviation | Example           |
|---------------|--------------|-------------------|
| Label         | lbl          | lbl_title         |
| Text box      | txt          | txt_enter_task    |
| Button        | btn          | btn_add_task      |
| List Item     | itm          | itm_task          |

## 3. Source file structure
### configs
- Define the test data and url for test environments 
    - You must reuse the existing test data, without modifying or deleting it. If you are unable to reuse the existing data, you can either add more data yourself or request the creation of new data with a prefix is automation
        + For example **Automation Test Project 1**, **automation_user1@smartosc.com**

### pages
- Define the actions on each separate page (pageActions)
- Should explain **WHAT** function does, not how does its task
- You must reuse the existing functions without modifying or deleting them (if you want to make changes, ensure that it doesn't affect the functionality of functions and test cases for others). If you cannot reuse the existing functions, you can create a new function
- Define the locator on each page separate (pageLocators)
- Define the common function (can use for all pages)

### tests
- Test steps are understandable
- One test case should be testing one thing
- No complex logic (LOOPS, IF/ELSE) on test case level
- No single keyword such as: fill, click,...have to call feature functions in test cases
- Preferably less than 10 steps
- Select suitable abstraction level

### playwright.config.ts file
- Set up and customize the execution of tests and browser drivers.
    - Configure supported browsers: Chromium, Firefox or WebKit
    - Set timeouts and environments: You can configure the maximum wait time for test runs as well as specific environments for different tests
    - Handle and configure reports: Playwright provides integrated reporting so that you can check the results of your tests. The playwright.config.ts file allows you to configure reports, such as exporting reports in HTML, JSON, or other formats
    - ...

## 3. Git flow
- Create the branch with the same name as the ticket (Have to rebase from main branch)
- The test case has the same tag in the ticket (**@AT-1**)
- When creating the merge request, assign the reviewer as ''
- You have to handle conflicts before creating a merge request
- The CI/CD pipeline for pull requests must complete with a successful status before merging

## 4. How to run test
- Pre-requisites:
    + Clone code from: https://github.com/phuongmtt/terem-qa-homework
    + Open the code with Visual Studio Code
    + Run this command line: npm i or npm ci
    + Install this extension: Playwright Test for VSCode
- Commands to run: npx playwright test
    - Using Tags: Execute the following command to run tests with specific tags:
        + Example: npx playwright test --grep "@AT-1"

- Keep It Stupid Simple (KISS) keep the code simple and clear, making it easy to understand. After all, programming languages are for humans to understand — computers can only understand 0 and 1 — so keep testscript simple and straightforward. Keep your keywords small. Each keyword should never be more than 10-20 lines.
Each keyword should only solve one small problem, not many use cases. If you have a lot of conditions in the keyword, break these out into smaller keywords. It will not only be easier to read and maintain, but it can help find bugs a lot faster.

- Page object model (POM)

## 5. CI-CD
- CI/CD pipeline trigger on push or creating pull request to 'main', to run automation test scripts to ensure code changes are validated for functionality and stability.
    + Sets up Ubuntu environment
    + Checkout Code
    + Setup Node JS
    + Install dependencies
    + Install Playwright browsers
    + Deploy Test Environment
    + Run Playwright Tests
    + Stop Test Environment
    + Upload Artifact