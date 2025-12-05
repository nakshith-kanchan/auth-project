// @ts-check
import { test, expect } from '@playwright/test';

test.only('Login and Sinpu', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await expect(page).toHaveTitle("Auth Demo");

  //empty fields
  await page.locator("#login-submit").click();
  const toast = page.locator('div[role="alert"]').last();
  await expect(toast).toContainText('Enter a valid email');

  //Empty password field
  await page.locator("#email").fill("rajesh@gmail.com");
  await page.locator("#login-submit").click();
  await expect(toast).toContainText('Enter password');

  //Not checking checkbox
  await page.locator("#email").fill("rajesh@gmail.com");
  await page.locator("#password").fill("Rajesh@123");
  await page.locator("#login-submit").click();
  await expect(toast).toContainText('You must accept terms and conditions');

  //Wrong credential
  
  await page.locator("#email").fill("rajesh@gmail.com");
  await page.locator("#password").fill("Rajesh@23");
  await page.locator("#terms").check();
  await page.locator("#login-submit").click();
  await expect(toast).toContainText('Invalid credentials');
   
  //Successfull Login
  await page.locator("#email").fill("rajesh@gmail.com");
  await page.locator("#password").fill("Rajesh@123");
  await page.locator("#terms").check();
  await page.locator("#login-submit").click();
  await expect(page.locator('#dashboard-title')).toContainText('Dashboard');
  
  //signup
  await page.locator("a[href*='signup']").click();

  // EMPTY FIELDS
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('First name must be at least 2 characters');

  // INVALID FIRST NAME
  await page.locator("#signup-firstName").fill("R@");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('First name must be at least 2 characters');

  // INVALID LAST NAME
  await page.locator("#signup-firstName").fill("Rahul");
  await page.locator("#signup-lastName").fill("R@j");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('Last name must be at least 2 characters');

  // INVALID PHONE
  await page.locator("#signup-lastName").fill("Raj");
  await page.locator("#signup-phone").fill("12");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('Phone must be numeric between 7 and 15 digits');

  // COUNTRY NOT SELECTED
  await page.locator("#signup-phone").fill("9876543210");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('Country required');

  // INVALID EMAIL
  await page.selectOption("#signup-country", "India");
  await page.locator("#signup-company").fill("Microsoft");
  await page.locator("#signup-email").fill("invalid-email");
  await page.locator("#signup-password").fill("Password@123");
  await page.locator("#signup-confirmPassword").fill("Password@123");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('Invalid email');

  // WEAK PASSWORD
  await page.locator("#signup-email").fill("user@gmail.com");
  await page.locator("#signup-password").fill("weak");
  await page.locator("#signup-confirmPassword").fill("weak");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('Password must be min 8 chars');

  // PASSWORD MISMATCH
  await page.locator("#signup-password").fill("Password@123");
  await page.locator("#signup-confirmPassword").fill("Password@12");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('Passwords do not match');

  // DUPLICATE EMAIL (backend should show error)
  await page.locator("#signup-email").fill("rajesh@gmail.com"); // existing email in your JSON
  await page.locator("#signup-password").fill("Password@123");
  await page.locator("#signup-confirmPassword").fill("Password@123");
  await page.locator("#signup-submit").click();
  await expect(toast).toContainText('User already exists');

  // SUCCESSFUL SIGNUP (unique email)
  const newEmail = `user${Date.now()}@test.com`;

  await page.locator("#signup-email").fill(newEmail);
  await page.locator("#signup-password").fill("Password@123");
  await page.locator("#signup-confirmPassword").fill("Password@123");
  await page.locator("#signup-submit").click();

  await expect(page.locator('#dashboard-title')).toContainText('Dashboard');

});

