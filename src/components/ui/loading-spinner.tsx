import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg"
        },
        className
      )}
    />
  )
}

interface LoadingStateProps {
  children: React.ReactNode
  message?: string
  className?: string
}

export function LoadingState({ children, message = "Loading...", className }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-sm text-muted-foreground mb-2">{message}</p>
      {children}
    </div>
  )
}