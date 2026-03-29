import demoData from '../demo.json'

export function loadDemoData() {
  const data = demoData as any

  // V2 format: { version: "2.0", frameworks: { fwId: { assessment, snapshots } } }
  const frameworks = data.frameworks as Record<string, { assessment: any; snapshots: any[] }>
  for (const [frameworkId, fwData] of Object.entries(frameworks)) {
    if (fwData.assessment) {
      localStorage.setItem(`assessment-${frameworkId}`, JSON.stringify(fwData.assessment))
    }
    if (Array.isArray(fwData.snapshots)) {
      localStorage.setItem(`snapshots-${frameworkId}`, JSON.stringify(fwData.snapshots))
    }
  }

  localStorage.setItem('active-framework', data.activeFramework || 'nist-csf-2')
  localStorage.setItem('enabled-frameworks', JSON.stringify(
    data.enabledFrameworks || ['nist-csf-2', 'iso-27001', 'cmmc']
  ))
}
