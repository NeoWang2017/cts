const puppeteer = require('puppeteer');
const {getAssertResult, sleep} = require("./assist");

describe('Login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('1.返回scopes', async () => {
    await page.goto('http://localhost:3000/cts/login-case');
    await sleep(5000)
    await page.click('div[data-name="case-card"]:nth-child(1) button');
    // 监听新标签页或新窗口的打开事件
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    page = await newPagePromise;
    await sleep(5000)
    const authBtn = await page.$('#login-modal-title');
    console.log(authBtn)

    const text = await getAssertResult(page, 1);

    await sleep(60000)

    expect(text).toContain('校验通过');
  });

  it('2.不返回scopes', async () => {
    await page.goto('http://localhost:3000/cts/login-case');
    await page.click('div[data-name="case-card"]:nth-child(2) button');

    const text = await getAssertResult(page, 2);

    expect(text).toContain('校验通过');
  });
});
