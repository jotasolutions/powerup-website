"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const REDIRECT_SECONDS = 30

export type RedirectCountdown = {
  secondsLeft: number
  stopped: boolean
  stop: () => void
}

// The 404 still answers with a 404 status: the redirect happens in the browser, and Google doesn't
// render pages that return an error, so it never sees it as a redirect to the home.
export function useRedirectCountdown(href: string): RedirectCountdown {
  const router = useRouter()
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)
  const [stopped, setStopped] = useState(false)

  // Counted against a deadline, not by ticks: browsers slow timers down in tabs that aren't in
  // front, and the countdown has to stay in step with the ring, which runs on real time.
  useEffect(() => {
    if (stopped) return
    const deadline = Date.now() + REDIRECT_SECONDS * 1000
    const timer = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      setSecondsLeft(left)
      if (left === 0) {
        window.clearInterval(timer)
        router.replace(href)
      }
    }, 250)
    return () => window.clearInterval(timer)
  }, [href, router, stopped])

  return { secondsLeft, stopped, stop: () => setStopped(true) }
}
