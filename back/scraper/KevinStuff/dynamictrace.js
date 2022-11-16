// imports
var fs = require('fs'); // file writer

var root = "http://www.the2818life.com/floor-plans"; 

const puppeteer = require('puppeteer');

(async function scrape() {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto(root);

    // extracting information from code
    let properties = await page.evaluate(() => {
        const pgTag = document.querySelector(".sqs-cart-dropzone");
        return pgTag.textContent;
    });

    // logging results
    console.log(properties);
    await browser.close();

})();
