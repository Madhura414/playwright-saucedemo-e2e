# SauceDemo Playwright E2E Suite

End-to-end tests for https://www.saucedemo.com/ using Playwright + JavaScript,
structured with the Page Object Model.

## Structure
```
saucedemo-playwright/
├── playwright.config.js
├── package.json
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
└── tests/
    └── checkout-flow.spec.js
```

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
npm test              # headless, all browsers
npm run test:headed   # see the browser
npm run test:ui       # interactive Playwright UI mode (great for debugging)
npm run report        # open the last HTML report
```

## What the main spec covers
- Logging in with a standard user
- Sorting products
- Adding multiple items to the cart
- Verifying cart contents
- Completing checkout (info -> overview -> confirmation)
- Asserting the final "Thank you for your order!" message
- A negative test: locked-out user login attempt

## Next steps to extend this suite
- Add a `data-test` based fixture for logging in via `page.evaluate` + localStorage
  (SauceDemo lets you skip the UI login for speed on later tests)
- Parametrize the purchase test across `standard_user`, `problem_user`, `performance_glitch_user`
  to see how the UI breaks differently per account
- Add visual regression checks with `expect(page).toHaveScreenshot()`
- Wire this into GitHub Actions using the official Playwright CI workflow

- To run it:
- npx playwright test tests/checkout-flow.spec.js --headed     # watch it run in a real browser
- npx playwright test tests/checkout-flow.spec.js --ui         # interactive step-through mode
- npx playwright test tests/checkout-flow.spec.js --debug      # pause at each step
