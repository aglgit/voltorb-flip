import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/voltorb-flip/");
});

test.describe("Memo Mode: OFF", () => {
    test("click should reveal tile", async ({ page }) => {
        const cellSelector = "#tile-0-0";
        const firstTile = await page.$(cellSelector);
        await firstTile?.click();

        const cellValue = await page.locator(cellSelector).innerText();
        expect(cellValue).toMatch(new RegExp("[1-3]|💣"));
    });
});

test.describe("Memo Mode: ON", () => {
    test.beforeEach(async ({ page }) => {
        const memoButton = await page.$("#memo-button-toggle");
        await memoButton?.click();

        const textElement = await page
            .locator("#memo-button-toggle")
            .innerText();
        expect(textElement).toBe("Memo Mode: ON");
    });

    test("click should not reveal tile", async ({ page }) => {
        const cellSelector = "#tile-1-1";
        const firstTile = await page.$(cellSelector);
        await firstTile?.click();

        const cellValue = await page.locator(cellSelector).innerText();
        expect(cellValue).toBe("");
    });
    test("toggle mark should add textElement", async ({ page }) => {
        const cellSelector = "#tile-2-2";
        const firstTile = await page.$(cellSelector);
        await firstTile?.click();

        const memoButton3 = await page.$("#memo-button-3");
        await memoButton3?.click();

        const cellValue = await page.locator(cellSelector).innerText();
        expect(cellValue).toBe("[3]");
    });
});

test.describe("Display Video Wrapper", () => {
    test("should allow me to open and close video wrapper", async ({
        page,
    }) => {
        const playbutton = await page.$("#playbutton");
        await playbutton?.click();

        await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
        await expect(page.locator("iframe")).toBeVisible();
    });
});
