const express = require('express');
const puppeteerCore = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  try {
    // Launch Chromium browser
    const browser = await puppeteerCore.launch({
      executablePath: '/usr/bin/chromium-browser', // Path to your Chromium executable
      defaultViewport: {
        width: 1920,
        height: 1080
      },
      headless: true // Run in headless mode
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');
    // Navigate to the provided URL
    await page.goto(url); // Wait until there are no more than 2 network connections for at least 500 ms

    // Wait for specific elements related to ads to appear

    // Capture screenshot
    const screenshot = await page.screenshot({ fullPage: true });

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
