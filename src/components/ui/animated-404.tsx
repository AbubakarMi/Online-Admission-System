"use client"

import * as React from "react"
import { X } from "lucide-react"

type Props = {
  isOpen: boolean
  onClose?: () => void
  durationMs?: number
}

export function Animated404({ isOpen, onClose, durationMs = 2500 }: Props) {
  React.useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      onClose?.()
    }, durationMs)
    return () => clearTimeout(t)
  }, [isOpen, onClose, durationMs])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full p-8 mx-4 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-border/40 shadow-xl">
        <button
          aria-label="Close 404"
          onClick={() => onClose?.()}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/5"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-8xl font-extrabold tracking-tight text-white animate-bounce">404</div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Page Not Found</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">It looks like something went wrong. Try again or return to the dashboard.</p>
          </div>

          <div className="mt-3 flex gap-3">
            <a className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white font-medium" href="/">
              Go Home
            </a>
            <button
              onClick={() => onClose?.()}
              className="inline-flex items-center px-4 py-2 rounded-md border border-border/50 text-white/90 hover:bg-white/5"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Animated404
