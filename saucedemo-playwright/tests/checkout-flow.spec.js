import{ test, expect } from '@playwright/test';
import{ LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import  { CartPage } from '../pages/CartPage';
import { CheckoutPage }from  '../pages/CheckoutPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo end-to-end purchase flow', () => {
  test('user can log in, add items, check out, and see the confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);

    // 2. Sort products by price low -> high
    await inventoryPage.sortBy('lohi');

    // 3. Add two products to the cart
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // 4. Go to cart and verify items are present
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(cartPage.cartItems).toHaveCount(2);

    // 5. Checkout - fill shipping info
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await checkoutPage.fillInfo('Jane', 'Doe', '12345');

    // 6. Overview step - verify total is shown, then finish
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.summaryTotal).toBeVisible();
    await checkoutPage.finish();

    // 7. Confirm order success
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('locked out user cannot log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', PASSWORD);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });
});
