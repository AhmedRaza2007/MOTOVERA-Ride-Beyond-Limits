import { useEffect, useState, useCallback } from 'react'
import { THEME_KEY } from '../utils/constants'

export function useTheme() {
  const [theme, setTheme] = useState(() => (localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'))

  useEffect(() => {
    const body = document.body
    if (theme === 'light') body.classList.add('light-mode')
    else body.classList.remove('light-mode')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}