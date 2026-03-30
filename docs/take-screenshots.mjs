import puppeteer from 'puppeteer'
import { readFileSync } from 'fs'

const BASE = 'http://localhost:5173'
const DIR = 'docs/screenshots'
const WIDTH = 1440
const HEIGHT = 900

// Load and unpack V2 demo data into localStorage-compatible entries
const demoData = JSON.parse(readFileSync('public/demo.json', 'utf-8'))

const localStorageData = {
  'active-framework': 'nist-csf-2',
  'enabled-frameworks': JSON.stringify(['nist-csf-2', 'iso-27001', 'soc2', 'cmmc', 'hipaa', 'pci-dss', 'nist-800-53', 'nist-800-171', 'iso-42001', 'gdpr', 'nist-pf']),
  'last-backup-date': new Date().toISOString(),
}

// Unpack V2 format: frameworks.{id}.assessment → assessment-{id}, frameworks.{id}.snapshots → snapshots-{id}
if (demoData.frameworks) {
  for (const [fwId, fwData] of Object.entries(demoData.frameworks)) {
    if (fwData.assessment) {
      localStorageData[`assessment-${fwId}`] = JSON.stringify(fwData.assessment)
    }
    if (Array.isArray(fwData.snapshots)) {
      localStorageData[`snapshots-${fwId}`] = JSON.stringify(fwData.snapshots)
    }
  }
}

const views = [
  { name: 'dashboard', hash: '#dashboard', wait: 1500 },
  { name: 'category-assessment', hash: '#category/GV.OC', wait: 1000, expand: true },
  { name: 'gap-analysis', hash: '#gap-analysis', wait: 1000 },
  { name: 'heatmap', hash: '#heatmap', wait: 1000 },
  { name: 'cross-map', hash: '#cross-map', wait: 1000 },
  { name: 'history', hash: '#history', wait: 1500 },
]

const browser = await puppeteer.launch({ headless: true })

for (const view of views) {
  const viewPage = await browser.newPage()
  await viewPage.setViewport({ width: WIDTH, height: HEIGHT })

  // Inject localStorage BEFORE any page JS runs
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
