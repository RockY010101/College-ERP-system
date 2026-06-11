// ══════════════════════════════════════════════════════════════════════
// useFetch.js — Reusable API fetch hook
// Usage: const { data, loading, error } = useFetch(apiFn, [deps])
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'

/**
 * @param {Function} apiFn   - async function that returns axios response
 * @param {Array}    deps    - dependency array (re-fetches when changed)
 * @param {*}        initial - initial value for data (default: null)
 */
export function useFetch(apiFn, deps = [], initial = null) {
  const [data, setData]       = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFn()
      setData(res.data)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}
