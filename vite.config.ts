import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function inlineAssetsPlugin(): Plugin {
  return {
    name: 'inline-assets',
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
      // Inline favicon as base64 data URI
      try {
        const faviconPath = resolve(__dirname, 'public/favicon.svg')
        const faviconData = readFileSync(faviconPath, 'base64')
        html = html.replace(
          /href="[^"]*favicon\.svg"/,
          `href="data:image/svg+xml;base64,${faviconData}"`
        )
      } catch (e) {
        console.warn('Warning: Could not inline favicon:', e)
      }

      // Fetch Google Fonts and inline as base64
      try {
        const fontsUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
        const cssRes = await fetch(fontsUrl, {
          headers: {
            // Request woff2 format
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
          }
        })
        let css = await cssRes.text()

        // Find all font file URLs and inline them
        const urlPattern = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g
        const matches = [...css.matchAll(urlPattern)]
        for (const match of matches) {
          try {
            const fontRes = await fetch(match[1])
            const fontBuffer = await fontRes.arrayBuffer()
            const fontBase64 = Buffer.from(fontBuffer).toString('base64')
            const isWoff2 = match[1].includes('.woff2')
            const mimeType = isWoff2 ? 'font/woff2' : 'font/woff'
            css = css.replace(match[1], `data:${mimeType};base64,${fontBase64}`)
          } catch {
            console.warn('Warning: Could not fetch font file:', match[1])
          }
        }

        // Remove Google Fonts link tags
        html = html.replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g, '\n    ')
        html = html.replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*/g, '\n    ')
        html = html.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">\s*/g, '\n    ')

        // Inject inlined font CSS
        html = html.replace('</head>', `    <style>${css}</style>\n  </head>`)
      } catch (e) {
        console.warn('Warning: Could not inline Google Fonts (app will use system font fallback):', e)
      }

      return html
    }}
  }
}

export default defineConfig(({ mode }) => {
  const isStandalone = mode === 'standalone' || mode === 'demo'
  const isDemo = mode === 'demo'

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      ...(isStandalone ? [viteSingleFile(), inlineAssetsPlugin()] : []),
    ],
    build: {
      ...(isStandalone && {
        assetsInlineLimit: 100_000_000,
        cssCodeSplit: false,
      }),
      outDir: isDemo ? 'dist-demo' : isStandalone ? 'dist-standalone' : 'dist',
    },
    define: {
      '__DEMO_MODE__': JSON.stringify(isDemo),
      '__STANDALONE_MODE__': JSON.stringify(isStandalone),
    },
  }
})
