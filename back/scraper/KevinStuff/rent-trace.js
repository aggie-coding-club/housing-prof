// imports
var fs = require('fs'); // file writer
const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');
var robotsParser = require('robots-parser'); 

// start run crawler
var root = "https://www.vintageatcollegestation.com/floor-plans/"; 

fetchData(root); 

async function fetchData(url) {
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    if(response.status < 200 || response.status >= 300){
        console.log("Error occurred while fetching data");
        return;
    }
    
    // check noIndex and robots.txt so you don't get blocked
    var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
    var robots = robotsParser(url+'robots.txt');
    if (robots.isDisallowed(url)) {
        return;
    }

    const html = response.data;
    const $ = cheerio.load(html); 
    
    var keywords = [];

    var r = readline.createInterface({
        input : fs.createReadStream('keywords.txt')
    });

    r.on('line', function (text) {
        keywords.push(text);
    });

    r.on('close', function () {
        let urls = [];
        $("*").each((_,element) => { // each element finds "a" elements
            $(element).find("a").each(function(i, link){
                if ($(link).attr("href") != null) { // if there is a link
                    if ($(link).text().trim().includes('Apply Now') || $(link).text().trim().includes('APPLY NOW') || $(link).text().trim().includes('apply now') || $(link).text().trim().includes('Apply Today') || $(link).text().trim().includes('APPLY TODAY') || $(link).text().trim().includes('apply today') || $(link).text().trim().includes('Apply Online') || $(link).text().trim().includes('APPLY ONLINE') || $(link).text().trim().includes('apply online')) { // keyword search
                        let href = $(link).attr("href");

                        if (href.at(0) == '/') { // if there is no root url
                            href = root+href.substring(1, href.length);
                        }

                        let found = false;
                        for (let i = 0; i<urls.length; i++) { // prevent duplicates
                            if (href == urls[i]) {
                                found = true;
                            }
                        }
                        if (!found) { urls.push(href); } 
                    }
                }
                else {
                    $(link).children().each((_,child) => { // if text is inside of the element
                        if ($(child).text().trim() === 'Apply Now') {
                            let href = $(link).attr("href");

                            if (href.at(0) == '/') { // if there is no root url
                                href = root+href.substring(1, href.length);
                            }

                            let found = false;
                            for (let i = 0; i<urls.length; i++) { // prevent duplicates
                                if (href == urls[i]) {
                                    found = true;
                                }
                            }
                            if (!found) { urls.push(href); }
                        }
                    });
                }
            });
        });

        // noIndex
        if ($.html().includes(noIndex)) { // breaks from the function and does not get anything if the html has a noIndex header
            return;
        }

        // timestamp for when the data was retrieved
        var today = new Date();
        var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        // writing json, you can format json like below
        var json = {
            urls: urls,
            time : timestamp
        };

        writeFile(json);
    });

    // waits 1 second before scraping another site, used when you are scraping multiple sites
    await new Promise(r => setTimeout(r, 1000));
}

// JSON writing data to a file using fs, make sure to do JSON.stringify for any data
function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        }
    );
}
