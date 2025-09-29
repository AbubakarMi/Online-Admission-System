import * as React from "react"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  number: number
  title: string
  description?: string
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <div className={cn("flex justify-between", className)}>
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep
        const isCurrent = step.number === currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  {
                    "border-primary bg-primary text-primary-foreground": isCompleted,
                    "border-primary bg-background text-primary": isCurrent,
                    "border-muted bg-background text-muted-foreground": !isCompleted && !isCurrent,
                  }
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-medium",
                    {
                      "text-primary": isCurrent,
                      "text-muted-foreground": !isCurrent,
                    }
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-4 h-0.5 w-16 bg-muted",
                  {
                    "bg-primary": isCompleted,
                  }
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}