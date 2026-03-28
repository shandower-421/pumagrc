import puppeteer from 'puppeteer'
import { readFileSync } from 'fs'

const BASE = 'http://localhost:5173'
const DIR = 'docs/screenshots'
const WIDTH = 1440
const HEIGHT = 900

// Load the full demo data — keys map directly to localStorage keys
const demoData = JSON.parse(readFileSync('public/demo.json', 'utf-8'))

// Build localStorage entries: each top-level key becomes a localStorage key with JSON-stringified value
const localStorageData = {
  'active-framework': 'nist-csf-2',
  'enabled-frameworks': JSON.stringify(['nist-csf-2', 'iso-27001', 'soc2', 'cmmc', 'hipaa', 'pci-dss']),
}
for (const [key, value] of Object.entries(demoData)) {
  localStorageData[key] = JSON.stringify(value)
}

const views = [
  { name: 'dashboard', hash: '#dashboard', wait: 1500 },
  { name: 'gap-analysis', hash: '#gap-analysis', wait: 1000 },
  { name: 'heatmap', hash: '#heatmap', wait: 1000 },
  { name: 'history', hash: '#history', wait: 1500 },
  { name: 'cross-map', hash: '#cross-map', wait: 1000 },
  { name: 'category-assessment', hash: '#category/GV.OC', wait: 1000, expand: true },
]

const browser = await puppeteer.launch({ headless: true })

for (const view of views) {
  // Use a fresh page per view to avoid React state leaking between navigations
  const viewPage = await browser.newPage()
  await viewPage.setViewport({ width: WIDTH, height: HEIGHT })

  // Inject localStorage BEFORE any page JS runs via evaluateOnNewDocument
  await viewPage.evaluateOnNewDocument((data) => {
    for (const [key, value] of Object.entries(data)) {
      localStorage.setItem(key, value)
    }
  }, localStorageData)

  await viewPage.goto(`${BASE}/${view.hash}`, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, view.wait))

  if (view.expand) {
    await viewPage.evaluate(() => {
      const btns = [...document.querySelectorAll('[aria-expanded="false"]')]
      const mainBtn = btns.find(b => b.closest('main'))
      if (mainBtn) mainBtn.click()
    })
    await new Promise(r => setTimeout(r, 600))
  }

  await viewPage.screenshot({ path: `${DIR}/${view.name}.png`, fullPage: false })
  console.log(`Captured: ${view.name}`)
  await viewPage.close()
}

await browser.close()
console.log('Done!')
