const axios = require('axios');
const cheerio = require('cheerio');

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

module.exports = {
    getZodiacSign
}