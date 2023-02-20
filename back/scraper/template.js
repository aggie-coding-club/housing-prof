// imports
var fs = require('fs'); // file writer
const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');
var robotsParser = require('robots-parser'); // ignoring robots.txt and noIndex will block your crawler

var root = "https://www.apartments.com/"; 

fetchData(root+"college-station-tx/?bb=ru0nkg-1lJz4hwgpC"); 

async function fetchData(url) {

    let response = await axios(url).catch((err) => console.log(err));
    if(response.status < 200 || response.status >= 300){
        console.log("Error occurred while fetching data");
        return;
    }
    
    var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
    var robots = robotsParser(root+'robots.txt');
    if (robots.isDisallowed(url)) { // if robots does not allow the current site to be indexed, break from the function
        return;
    }

    // get html data
    const html = response.data; 
    const $ = cheerio.load(html); // cheerio loads in the page
    
    var keywords = [];

    var r = readline.createInterface({
        input : fs.createReadStream('keywords.txt')
    });
    var i = 0;

    r.on('line', function (text) {
        keywords[i] = text;
        i++;
    });

    r.on('close', function () {

        if ($.html().includes(noIndex)) {
            return;
        }

        

        var today = new Date();
        var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var json = {
            title : titleName,
            floor : a1,
            image: imageLink,
            time : timestamp
        };

        writeFile(json);
    });

    await new Promise(r => setTimeout(r, 1000));
}

function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        }
    );
}
