const { test } = require("@playwright/test");
require("dotenv").config();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function optionLocator(page, locator, number) {
  await page
    .locator(`.Qr7Oae:has-text("${locator}") div.nWQGrd`)
    .nth(getRandomInt(number))
    .click();
}

test("test", async ({ page }) => {
  const buttonNext = page.getByRole("button", { name: "Sonraki" });
  const buttonSubmit = page.getByText("Gönder");

  await page.goto(process.env.FORM_URL);
  await buttonNext.click();

  await optionLocator(page, "Cinsiyetiniz", 1);
  await optionLocator(page, "Yaşınız", 5);
  await optionLocator(page, "Medeni", 1);
  await optionLocator(page, "Eğitim", 6);
  await optionLocator(page, "Kurumunuzdaki", 3);
  await optionLocator(page, "Toplam", 3);
  await optionLocator(page, "Gelir", 4);
  await buttonNext.click();

  for (let i = 0; i < 3; i++) {
    await page.waitForLoadState();
    const listItems = await page.locator(".N9Qcwe").all();
    for (const li of listItems) {
      await li.locator(".T5pZmf").nth(getRandomInt(4)).click();
    }
    if (await buttonNext.isVisible()) {
      await buttonNext.click();
    } else {
      await buttonSubmit.click();
    }
  }
});
