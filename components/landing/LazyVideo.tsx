"use client"

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react"

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> & {
  src: string
  /** Fetch the first frame before it shows up, e.g. for the slides next to the active one. */
  preloadFirstFrame?: boolean
}

/**
 * Muted looping video that downloads nothing until it's on screen (or `preloadFirstFrame` asks
 * for its first frame), and plays only while it's visible. It doesn't use `autoPlay`: with it,
 * Chrome downloads the whole file at page load, even for slides nobody sees.
 * A slide outside its carousel's `overflow-hidden` box doesn't count as on screen.
 */
export function LazyVideo({ src, preloadFirstFrame = false, children, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  // Once requested, the file stays: dropping `src` would throw away what was downloaded.
  if (!shouldLoad && (isVisible || preloadFirstFrame)) setShouldLoad(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries.some((entry) => entry.isIntersecting))
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return
    // The browser can refuse play() (iOS Low Power Mode, for one); the video then just stays still.
    if (isVisible) video.play().catch(() => {})
    else video.pause()
  }, [isVisible, shouldLoad])

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      {...props}
    >
      {children}
    </video>
  )
}
