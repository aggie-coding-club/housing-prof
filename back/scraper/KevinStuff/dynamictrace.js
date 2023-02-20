// imports
var fs = require('fs'); // file writer

var root = "https://www.americancampus.com/student-apartments/tx/college-station/u-centre-at-northgate/floor-plans#/detail/706-4bed-4bathapartmenta-fall2023_fullterm_8_23-7_24"; 

const puppeteer = require('puppeteer');

async function scrapeHousingPrices() {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  await page.goto(root, { waitUntil: 'networkidle2' });

  const prices = await page.$$eval('div.detail-footerCost--reduced span', prices => prices.map(price => price.textContent));
  const rentLink = await page.$$eval('div.detail-footerApply a.detail-footerApplyLink', rentLink => rentLink.map(link => link.href));
  console.log(prices);
  console.log(rentLink);

  await browser.close();
}

scrapeHousingPrices();

