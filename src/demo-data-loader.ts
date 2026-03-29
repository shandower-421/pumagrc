import demoData from '../demo.json'

export function loadDemoData() {
  // Load assessments for each framework
  const assessments = (demoData as any).assessments as Record<string, any>
  for (const [frameworkId, assessment] of Object.entries(assessments)) {
    localStorage.setItem(`assessment-${frameworkId}`, JSON.stringify(assessment))
  }

  // Load snapshots for each framework
  const snapshots = (demoData as any).snapshots as Record<string, any[]>
  for (const [frameworkId, snapshotList] of Object.entries(snapshots)) {
    localStorage.setItem(`snapshots-${frameworkId}`, JSON.stringify(snapshotList))
  }

  localStorage.setItem('active-framework', (demoData as any).activeFramework || 'nist-csf-2')
  localStorage.setItem('enabled-frameworks', JSON.stringify(
    (demoData as any).enabledFrameworks || ['nist-csf-2', 'iso-27001', 'cmmc']
  ))
}
