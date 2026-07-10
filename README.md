# Test Automation Framework

This project is an automated UI test framework using Playwright and written in TypeScript. This framework is using the Page Object Model pattern to keep page selectors and page actions separate from the test scenarios.

- `playwright.config.ts` contains Playwright test configuration.
- `src/pages` contains Page Object Model classes.
- `src/data` contains test data.
- `tests` contains the test specifications.
- `.env` stores the base URL, usernames, and password.

## Test Scenarios

- Login validation
- Add product to cart
- Checkout product
- Logout

## Clone Repository

```bash
git clone https://github.com/adepratamaa/test-jbl.git
cd test-jbl
```

## Setup Instructions

Make sure Node.js is installed, then install project dependencies:

```bash
npm install
```

Install the Playwright browser binaries:

```bash
npx playwright install
```

Create a `.env` file in the project root:

```env
BASE_URL=https://www.saucedemo.com/
STANDARD_USERNAME=your_valid_username
STANDARD_PASSWORD=your_password
INVALID_USERNAME=invalid_user
INVALID_PASSWORD=qwerty123
```

## How to Run Tests

Run all tests in Chromium:

```bash
npm run test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open the Playwright HTML report after a test run:

```bash
npm run report
```

## Assumptions Made

- The application is Sauce Demo.
- Test users and passwords are provided through `.env`.
- The test data in `src/data` matches the current Sauce Demo product names and login users.
- Playwright reports and test results are generated locally and not committed to the repository.

## Run GitHub Actions

This project runs tests automatically when new changes are pushed to the `main` branch.

To run the workflow manually:

1. Open the repository on GitHub.
2. Go to the `Actions` tab.
3. Select the `Test` workflow.
4. Click `Run workflow`.
5. Select the `main` branch, then click `Run workflow`.

## Next improvement

- Add more test cases
- Integrate with any tools
