import { useState, useEffect, useCallback } from 'react'

export function useHash() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || 'dashboard')

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash.slice(1) || 'dashboard')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((path: string) => {
    window.location.hash = path
  }, [])

  return { hash, navigate }
}
