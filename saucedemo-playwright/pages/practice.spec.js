import  {test, expect} from '@playwright/test';
 test ("test sample",async({page})=>

 {

    await page.goto("httpas/www.saudeco.co");
    await page.locator("").click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
     await expect(page.locator("shopping-cart-badge")).toBeVisible();

 }
 )