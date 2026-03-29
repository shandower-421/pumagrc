import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (__DEMO_MODE__) {
  import('./demo-data-loader').then(({ loadDemoData }) => {
    loadDemoData()
    renderApp()
  })
} else {
  renderApp()
}
