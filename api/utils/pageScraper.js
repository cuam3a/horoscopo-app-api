const scraperObject = {
    url: 'https://www.amazon.com/Amazon-Photos/b?ie=UTF8&node=13234696011',
    async scraper(browser){
        let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		// Navigate to the selected page
		await page.goto(this.url);
		// Wait for the required DOM to be rendered
		await page.waitForSelector('.action-button');
		// Get the link to all the required books
        //let newPage = await browser.newPage();
        let login = await page.$eval('.action-button', link => link.href);

        await page.goto(login);

        await page.waitForSelector('.a-button-input');
        await page.$eval('.a-input-text.a-span12.auth-autofocus.auth-required-field', el => el.value = 'gcuameatelles@gmail.com');
        await page.$eval('.a-button-input', el => el.click());

        await page.waitForSelector('.a-button-input');
        await page.$eval('#ap_password', el => el.value = 'cuam3at3ll3s');
        await page.$eval('.a-button-input', el => el.click());

        await page.waitForSelector("#a-page")
        await page.goto("https://www.amazon.com/photos/all/gallery/5NTVdkcVTUqMKjWVzNzYBw");
        
        await page.waitForSelector(".share")
        await page.$eval('.share', el => el.click());

        await page.waitForSelector(".share-options-legacy-module__shareOptionButton__PuNwQ.share-options-legacy-module__link__2_2jg")
        await page.$eval('.share-options-legacy-module__shareOptionButton__PuNwQ.share-options-legacy-module__link__2_2jg', el => el.click());

        await page.waitForSelector(".get-link.button")
        await page.$eval('.get-link.button', el => el.click());

        await page.waitForSelector(".copy-input.button-visible")
        let shareLink = await page.$eval('.copy-input.button-visible', el => { return el.getAttribute("value") });
        console.log(shareLink)
        //await newPage.goto(continueUser);
		// let urls = await page.$$eval('section ol > li', links => {
		// 	// Make sure the book to be scraped is in stock
		// 	links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
		// 	// Extract the links from the data
		// 	links = links.map(el => el.querySelector('h3 > a').href)
		// 	return links;
		// });


        // // Loop through each of those links, open a new page instance and get the relevant data from them
		// let pagePromise = (link) => new Promise(async(resolve, reject) => {
		// 	let dataObj = {};
		// 	let newPage = await browser.newPage();
		// 	await newPage.goto(link);
		// 	dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
		// 	dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
		// 	dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
		// 		// Strip new line and tab spaces
		// 		text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
		// 		// Get the number of stock available
		// 		let regexp = /^.*\((.*)\).*$/i;
		// 		let stockAvailable = regexp.exec(text)[1].split(' ')[0];
		// 		return stockAvailable;
		// 	});
		// 	dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
		// 	dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
		// 	dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
		// 	resolve(dataObj);
		// 	await newPage.close();
		// });

		// for(link in urls){
		// 	let currentPageData = await pagePromise(urls[link]);
		// 	// scrapedData.push(currentPageData);
		// 	console.log(currentPageData);
		// }

    }
}

module.exports = scraperObject;