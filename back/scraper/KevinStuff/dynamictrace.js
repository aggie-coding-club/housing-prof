// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "https://www.americancampus.com/student-apartments/tx/college-station/u-centre-at-northgate/floor-plans#/detail/706-4bed-4bathapartmenta-fall2023_fullterm_8_23-7_24"; 

async function isNoIndex(page) {
  const metaTags = await page.$$('meta');
  for (const meta of metaTags) {
    const name = await meta.getProperty('name');
    const httpEquiv = await meta.getProperty('httpEquiv');
    const content = await meta.getProperty('content');
    const nameValue = await name.jsonValue();
    const httpEquivValue = await httpEquiv.jsonValue();
    const contentValue = await content.jsonValue();
    if (nameValue === 'robots' && contentValue === 'noindex') {
      return true;
    }
    if (httpEquivValue === 'X-Robots-Tag' && contentValue.includes('noindex')) {
      return true;
    }
  }
  return false;
}

async function scrapeHousingPrices() {
  const robotsUrl = `${new URL(url).origin}/robots.txt`;
  const robotsTxt = await (await fetch(robotsUrl)).text();
  const robots = robotsParser(robotsUrl, robotsTxt);
  if (!robots.isAllowed(url, 'puppeteer')) {
    console.log(`Cannot scrape ${url}: robots.txt disallows crawling`);
    return false;
  }

  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  if (await isNoIndex(page)) {
    console.log(`Cannot scrape ${url}: page has noindex meta tag`);
    await browser.close();
    return false;
  }

  await page.goto(url, { waitUntil: 'networkidle2' });

  const prices = await page.$$eval('div.detail-footerCost--reduced span', prices => prices.map(price => price.textContent));
  const rentLink = await page.$$eval('div.detail-footerApply a.detail-footerApplyLink', rentLink => rentLink.map(link => link.href));
  console.log(prices);
  console.log(rentLink);

  await browser.close();
}

scrapeHousingPrices();

