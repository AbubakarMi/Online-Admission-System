"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { User } from "@/lib/types"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
  isNewUser?: boolean
  onContinue: () => void
}

export function WelcomeModal({ isOpen, onClose, user, isNewUser = false, onContinue }: WelcomeModalProps) {
  const [showContent, setShowContent] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isOpen])

  const handleContinue = () => {
    onClose()
    onContinue()
  }

  const getRoleDetails = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          title: 'Administrator',
          description: 'Manage applications, users, and system settings',
          color: 'bg-purple-100 text-purple-700',
          icon: '👑'
        }
      case 'staff':
        return {
          title: 'Staff Member',
          description: 'Review applications and assist students',
          color: 'bg-blue-100 text-blue-700',
          icon: '👨‍💼'
        }
      default:
        return {
          title: 'Student',
          description: 'Submit applications and track your progress',
          color: 'bg-green-100 text-green-700',
          icon: '🎓'
        }
    }
  }

  const roleDetails = getRoleDetails(user.role)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-transparent shadow-none p-0">
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl animate-pulse-glow"></div>
          <div className="absolute inset-0 bg-mesh opacity-20 rounded-3xl"></div>

          {/* Main Content */}
          <div className="relative bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
            {/* Header with Logo and Sparkles */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
                  <Logo className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
              </div>

              <DialogHeader className="space-y-4">
                <DialogTitle className="text-3xl font-bold font-display text-gradient-primary">
                  {isNewUser ? '🎉 Welcome to Adustech!' : '👋 Welcome Back!'}
                </DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                  {isNewUser
                    ? "Your account has been successfully created. Let's get you started on your educational journey!"
                    : "Great to see you again! Ready to continue your academic journey?"
                  }
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* User Info Card */}
            <div className={`bg-gradient-to-r from-background to-secondary/30 rounded-2xl p-6 mb-8 border border-border/50 transition-all duration-500 ${showContent ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                    {roleDetails.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-display mb-1">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <Badge className={`${roleDetails.color} border-0 px-3 py-1`}>
                  {roleDetails.title}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>{roleDetails.description}</span>
              </div>
            </div>

            {/* Features Preview */}
            {showContent && (
              <div className="grid gap-3 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                {(user.role === 'student' ? [
                  { icon: '📝', text: 'Submit and track your applications' },
                  { icon: '📊', text: 'Monitor your application progress' },
                  { icon: '🔔', text: 'Receive real-time notifications' }
                ] : user.role === 'admin' ? [
                  { icon: '👥', text: 'Manage users and applications' },
                  { icon: '📈', text: 'View analytics and reports' },
                  { icon: '⚙️', text: 'Configure system settings' }
                ] : [
                  { icon: '📋', text: 'Review student applications' },
                  { icon: '✅', text: 'Verify documents and data' },
                  { icon: '💬', text: 'Communicate with students' }
                ]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleContinue}
                className="w-full h-14 gradient-primary shadow-glow hover:shadow-xl text-white font-semibold text-lg interactive group"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="ghost"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                Maybe later
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent/20 rounded-full blur-sm animate-float"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/20 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}