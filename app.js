const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.amazon.com/gp/product/B07WK527B3?th=1");

    const productInfo = await page.evaluate(() => {
      const amazonPrice = document.querySelector(
        "#priceblock_ourprice > div > span > span.price-large"
      ).innerHTML;
      const comments = document.querySelectorAll(
        'div[id^="customer_review"] > div.a-row.a-spacing-small.review-data > span > div > div.a-expander-content.reviewText.review-text-content.a-expander-partial-collapse-content > span'
      );
      const commentsContent = [...comments].map(comment => comment.innerHTML);

      return {
        price: amazonPrice,
        comments: commentsContent
      };
    });

    console.log("productInfo", productInfo);
    await browser.close();
  } catch (error) {
    console.log("An error has ocurred:", error);
  }
})();
