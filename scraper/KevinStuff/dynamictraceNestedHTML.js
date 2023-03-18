// imports
var fs = require('fs'); // file writer

var root = "http://www.the2818life.com/floor-plans"; 

const puppeteer = require('puppeteer');

async function scrapeHousingPrices() {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  await page.goto(root, { waitUntil: 'networkidle2' });

  const frame = await page.$("#website_1111144"); 
  const frameContent = await frame.contentFrame();

  const prices = await frameContent.$$eval('.rent-price', prices => prices.map(price => price.textContent));
  const rentLink = await frameContent.$$eval('a.btn.availability', rentLink => rentLink.map(link => link.href));
  console.log(prices);
  console.log(rentLink);

  await browser.close();
}

scrapeHousingPrices();

