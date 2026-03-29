import { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { exportAllData } from '../../lib/export-json'

const BACKUP_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const SNOOZE_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000 // 3 days

function shouldShowReminder(): { show: boolean; neverBacked: boolean } {
  const snoozed = localStorage.getItem('backup-reminder-snoozed')
  if (snoozed) {
    const snoozeDate = new Date(snoozed).getTime()
    if (Date.now() - snoozeDate < SNOOZE_INTERVAL_MS) return { show: false, neverBacked: false }
  }

  const lastBackup = localStorage.getItem('last-backup-date')
  if (!lastBackup) return { show: true, neverBacked: true }

  const lastDate = new Date(lastBackup).getTime()
  if (Date.now() - lastDate > BACKUP_INTERVAL_MS) return { show: true, neverBacked: false }

  return { show: false, neverBacked: false }
}

export function BackupReminder() {
  const [state, setState] = useState(() => shouldShowReminder())

  useEffect(() => {
    setState(shouldShowReminder())
  }, [])

  if (!state.show) return null

  const handleSnooze = () => {
    localStorage.setItem('backup-reminder-snoozed', new Date().toISOString())
    setState({ show: false, neverBacked: false })
  }

  const handleExport = () => {
    exportAllData()
    setState({ show: false, neverBacked: false })
  }

  return (
    <div
      data-backup-reminder
      className="px-4 py-2 flex items-center gap-3 type-sm"
      style={{
        background: 'var(--color-warning-dim)',
        borderBottom: '1px solid rgba(217, 119, 6, 0.2)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-warning)' }} aria-hidden="true" />
      <span className="flex-1">
        {state.neverBacked
          ? 'You haven\'t exported your data yet. All data is stored in your browser and can be lost.'
          : 'It\'s been over a week since your last export. Back up your data to avoid loss.'}
      </span>
      <button
        onClick={handleExport}
        className="type-sm font-medium px-3 py-1 rounded-lg shrink-0"
        style={{ background: 'var(--color-accent)', color: 'white' }}
      >
        Export Now
      </button>
      <button
        onClick={handleSnooze}
        className="p-1 rounded shrink-0 hover:opacity-70"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="Dismiss reminder"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
