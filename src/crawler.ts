import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'

const { INVESTIDOR10_HOST } = process.env

export default class Crawler {

    private urlPattern = `https://investidor10.com.br/#TYPE#/#NAME#/`

    constructor(private quotaType: string, private quotaName: string) { }

    async getInfo() {
        if (!this.quotaName || !this.quotaName) {
            throw "Quota Name/Type not informed"
        }

        const url = this.urlPattern
            .replace('#TYPE#', this.quotaType)
            .replace('#NAME#', this.quotaName)

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROMIUM_PATH,
            args: ['--no-sandbox'],
        })
        const page = await browser.newPage()

        await page.goto(url, { waitUntil: 'domcontentloaded' })

        const bodyHandle = await page.$('body');
        const html = await page.evaluate(body => body?.innerHTML, bodyHandle);
        await bodyHandle?.dispose();

        if (!html) {
            return null
        }

        const $ = cheerio.load(html)
        const cardsTricker = $('section#cards-ticker')

        const quotation = cardsTricker.find('.cotacao ._card-body div span').text()
        const dividendYield = cardsTricker.find('.dy:eq(0) ._card-body div span').text()
        const equityValue = cardsTricker.find('.vp ._card-body span').text()
        const value = cardsTricker.find('.val ._card-body span').text()
        const valuation = cardsTricker.find('.dy:eq(1) ._card-body div span').text()

        return {
            id: this.quotaName,
            type: this.quotaType,
            quotation: Number(quotation.replace('R$ ', '').replace('.', '').replace(',', '.').trim()),
            dividendYield: Number(dividendYield.replace('%', '').replace('.', '').replace(',', '.').trim()),
            equityValue: Number(equityValue.replace(',', '.').trim()),
            value,
            valuation
        }
    }

}