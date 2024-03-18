const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--ignore-certificate-errors', '--disable-web-security', '--disable-features=IsolateOrigins', '--disable-site-isolation-trials'],
      defaultViewport: {
        width: 1920,
        height: 1080
      },
      headless: true
    }); // Adjust headless option as needed
    console.log("🚀 ~ app.get ~ browser:", browser)
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');
    // Navigate to the provided URL
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); // Wait until there are no more than 2 network connections for at least 500 ms

    // Wait for specific elements related to ads to appear

    // Capture screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    console.log("🚀 ~ app.get ~ screenshot:", screenshot)

    // Set response content type and send screenshot
    res.set('Content-Type', 'image/png');
    res.send(screenshot);

    // Close browser after completing the task
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error capturing screenshot');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
