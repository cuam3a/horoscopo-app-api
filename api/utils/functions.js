const axios = require('axios');
const cheerio = require('cheerio');
const browserObject = require('./browser');
const scraperController = require('./pageController');

const getZodiacSign = async(zodiac, day) => {
    let result = "";
    const url = "https://www.lavanguardia.com/horoscopo/signos-zodiaco-" + zodiac + ( day == "hoy" ? "/horoscopo-diario" : "/horoscopo-manana");
    
    await axios(url).then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);

      const selectedElem =".section-content.split-layout > div.main-content.has-social-links > div.text-block > p";
      result=$(selectedElem).text();
    });
    return result;
}

const createShareAmazonPhoto = async (user, pass, id) => {
  //Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)
  // let result = "";
  // const url = "https://www.amazon.com/Amazon-Photos/b?ie=UTF8&node=13234696011"

  // await axios(url).then((response) => {
  //   const html_data = response.data;
  //   const $ = cheerio.load(html_data);

  //   const btnLogin =".ember.nav-menu-cta.link.button.button-type-primary.button-theme-filled.font-size-small";
  //   console.log(btnLogin)
  // });
  // return result;
}

module.exports = {
    getZodiacSign,
    createShareAmazonPhoto
}