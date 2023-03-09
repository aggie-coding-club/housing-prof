// imports
var fs = require('fs'); // file writer

var root = "https://www.vintageatcollegestation.com/floor-plans/"; 

const puppeteer = require('puppeteer');

async function scrapeHousingPrices() {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  await page.goto(root, { waitUntil: 'networkidle2' });

  const prices = await page.$$eval('[data-click-select="#fp0"]', prices => prices.map(price => price.textContent));
  //const rentLink = await page.$$eval('div.detail-footerApply a.detail-footerApplyLink', rentLink => rentLink.map(link => link.href));
  console.log(prices);
  //console.log(rentLink);

  await browser.close();
}

scrapeHousingPrices();

