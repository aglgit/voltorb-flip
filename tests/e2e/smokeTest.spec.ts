import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("https://aglgit.github.io/voltorb-flip/");

    await expect(page).toHaveTitle(/Voltorb Flip/);
});

test("should have div with id game-board", async ({ page }) => {
    await page.goto("https://aglgit.github.io/voltorb-flip/");

    const gameBoard = await page.$("#game-board");
    expect(gameBoard).not.toBeNull();

    await expect(page.locator("#game-board")).toBeVisible();
});

test("should navigate to Github repository", async ({ page }) => {
    await page.goto("https://aglgit.github.io/voltorb-flip/");

    await page.click('a[href="https://github.com/aglgit/voltorb-flip"]');

    await expect(page).toHaveURL("https://github.com/aglgit/voltorb-flip");
});
