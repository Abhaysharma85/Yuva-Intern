import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "msedge" });
  
  // 1. Desktop Interactive Search & Modal
  const contextDesktop = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  const page = await contextDesktop.newPage();
  await page.goto("http://localhost:4173/");

  // Capture navbar & search bar close-up
  const searchArea = await page.$(".search-area");
  if (searchArea) {
    await page.locator(".navbar").screenshot({ path: "../week2/screenshots/04_navbar_component.png" });
    await searchArea.screenshot({ path: "../week2/screenshots/05_input_button_components.png" });
  }

  // Type search query
  await page.fill('input.ui-input', 'Batman');
  await page.click('button.ui-button');

  // Wait for movie grid
  await page.waitForSelector('.movie-grid .movie-card', { timeout: 10000 });
  await page.waitForTimeout(1000); // Wait for posters to render

  // Capture search results
  await page.screenshot({ path: "../week2/screenshots/06_desktop_search_results.png" });

  // Capture single MovieCard
  const firstCard = await page.$('.movie-card');
  if (firstCard) {
    await firstCard.screenshot({ path: "../week2/screenshots/07_moviecard_component.png" });
  }

  // Click on first movie to open modal
  await page.click('.movie-grid .movie-card');
  await page.waitForSelector('.modal-overlay', { timeout: 10000 });
  await page.waitForTimeout(1000);

  // Capture modal open on desktop
  await page.screenshot({ path: "../week2/screenshots/08_modal_desktop.png" });

  await contextDesktop.close();

  // 2. Tablet interactive search & modal
  const contextTablet = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const pageTablet = await contextTablet.newPage();
  await pageTablet.goto("http://localhost:4173/");
  await pageTablet.fill('input.ui-input', 'Inception');
  await pageTablet.click('button.ui-button');
  await pageTablet.waitForSelector('.movie-grid .movie-card', { timeout: 10000 });
  await pageTablet.waitForTimeout(1000);
  await pageTablet.screenshot({ path: "../week2/screenshots/09_tablet_search_results.png" });

  await pageTablet.click('.movie-grid .movie-card');
  await pageTablet.waitForSelector('.modal-overlay', { timeout: 10000 });
  await pageTablet.waitForTimeout(1000);
  await pageTablet.screenshot({ path: "../week2/screenshots/10_tablet_modal.png" });
  await contextTablet.close();

  // 3. Mobile interactive search & modal
  const contextMobile = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto("http://localhost:4173/");
  await pageMobile.fill('input.ui-input', 'Spider-Man');
  await pageMobile.click('button.ui-button');
  await pageMobile.waitForSelector('.movie-grid .movie-card', { timeout: 10000 });
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: "../week2/screenshots/11_mobile_search_results.png" });

  await pageMobile.click('.movie-grid .movie-card');
  await pageMobile.waitForSelector('.modal-overlay', { timeout: 10000 });
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: "../week2/screenshots/12_mobile_modal.png" });
  await contextMobile.close();

  await browser.close();
  console.log("Interactive screenshots captured successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
