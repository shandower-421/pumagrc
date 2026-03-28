import { useRef, useEffect, useCallback, useId, type ReactNode } from 'react'

const modalOverlay = "fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto py-8"
const modalCard = {
  background: 'var(--color-surface-overlay)',
  border: '1px solid var(--color-border-default)',
  boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
}

export function Modal({ open, onClose, children, wide, label }: { open: boolean; onClose: () => void; children: ReactNode; wide?: boolean; label?: string }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const labelId = useId()

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement
      setTimeout(() => {
        const focusable = dialogRef.current?.querySelector<HTMLElement>('button, input, select, textarea, [tabindex]')
        focusable?.focus()
      }, 50)
    } else if (previousFocus.current) {
      previousFocus.current.focus()
      previousFocus.current = null
    }
  }, [open])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose() }
    if (e.key === 'Tab' && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [onClose])

  if (!open) return null
  return (
    <div className={`${modalOverlay} animate-fade-in`} onClick={onClose} onKeyDown={handleKeyDown} role="dialog" aria-modal="true" aria-label={label || undefined} aria-labelledby={!label ? labelId : undefined}>
      <div ref={dialogRef} className={`rounded-xl p-6 ${wide ? 'max-w-lg' : 'max-w-sm'} w-full mx-4 my-auto max-h-[calc(100vh-4rem)] overflow-y-auto animate-scale-in`} style={modalCard} onClick={e => e.stopPropagation()}>
        {!label && <span id={labelId} className="sr-only">Dialog</span>}
        {children}
      </div>
    </div>
  )
}
