const path = require('path')
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone X']

async function demo () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.emulate(iPhone)
  await page.setViewport({
    width: 360,
    height: 4200,
    deviceScaleFactor: 2
  })
  await page.goto('https://m.sugarapp.cn/share/moment/5ed46e3c99358e097fe3227a');
  await page.waitFor(2000)
  await page.screenshot({
    path: path.resolve(__dirname, `./sugar/${Date.now()}.png`),
    type: 'png'
  });
  const title = await page.title()
  console.log('title=', title)
  const bodyHandle = await page.$('body')
  const result = await page.evaluate((body) => {
    const texts = []
    body.querySelectorAll('.praise-num').forEach((el) => {
      texts.push(el.innerText)
    })
    return Promise.resolve(texts)
  }, bodyHandle)
  console.log('result=', result)
  await browser.close();
}

// demo()

async function taobao () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // await page.setViewport({
  //   width: 1440,
  //   height: 900,
  //   deviceScaleFactor: 2
  // })
  await page.emulate(iPhone)
  const httpResponse = await page.goto('https://www.baidu.com')
  // console.log('httpResponse', httpResponse)
  await page.type('#index-kw', 'sugar 苏格', { delay: 200 })
  await page.click('#index-bn')
  await page.waitFor(2000)
  await page.screenshot({
    path: path.resolve(__dirname, `./sugar/baidu.png`)
  })
  await browser.close()
}

taobao()