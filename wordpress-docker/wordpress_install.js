const puppeteer = require('puppeteer');

const wpUser = process.env.WP_ADMIN_USER_NAME || "amir";
const wpPwd = process.env.WP_ADMIN_PASSWORD || "amir";
const wpEmail = process.env.WP_ADMIN_EMAIL || "bogus@email.com";

for (const property in process.env) {
    console.log(`${property}: ${process.env[property]}`);
}

(async (wpUser, wpPwd, wpEmail) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 10000,
    });
    const page = await browser.newPage();
    await page.goto(`http://${process.env.WORDPRESS_HOST}`);

    // Set blog title
    await page.evaluate(() => {
        let txtTitle = document.querySelector('#weblog_title');
        txtTitle.value = "Arbitary Blog Title";
    });

    // Set user name
    await page.evaluate((wpUser) => {
        let txtTitle = document.querySelector('#user_login');
        txtTitle.value = wpUser;
    }, wpUser);

    // Set password
    await page.evaluate((wpPwd) => {
        let txtTitle = document.querySelector('#pass1');
        txtTitle.value = wpPwd;
    }, wpPwd);

    // Set confirm weak password
    await page.evaluate(() => {
        let txtTitle = document.querySelector('.pw-checkbox');
        txtTitle.checked = true;
    });

    // Set email
    await page.evaluate((wpEmail) => {
        let txtTitle = document.querySelector('#admin_email');
        txtTitle.value = wpEmail;
    }, wpEmail);

    // Set search engine visibility
    await page.evaluate(() => {
        let txtTitle = document.querySelector('#blog_public');
        txtTitle.checked = true;
    });

    // await page.screenshot({ path: 'example.png' });

    // Click submit once the form is filled
    await page.evaluate(() => {
        let txtTitle = document.querySelector('#submit');
        txtTitle.checked = true;
    });

    // Use Promise.all to wait for two actions (navigation and click)
    await Promise.all([
        page.waitForNavigation(), // wait for navigation to happen
        page.click('#submit'), // click link to cause navigation
    ]);

    await browser.close();
})(wpUser, wpPwd, wpEmail);