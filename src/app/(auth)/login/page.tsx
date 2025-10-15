
"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { mockUsers } from "@/lib/data"
import { User } from "@/lib/types"
import { signIn } from "@/lib/auth"
import { Eye, EyeOff } from "lucide-react"
import { Logo } from "@/components/logo"
import { WelcomeModal } from "@/components/ui/welcome-modal"
import Animated404 from "@/components/ui/animated-404"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = React.useState(false)
  const [loggedInUser, setLoggedInUser] = React.useState<User | null>(null)
  const [show404, setShow404] = React.useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false)
  }

  const handleContinueToDashboard = () => {
    if (loggedInUser) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      })

      if (loggedInUser.role === 'admin' || loggedInUser.role === 'staff') {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }

  const handleLogin = async () => {
    // Immediately show the 404 overlay on click so the user sees the animation
    setShow404(true)
    setIsLoading(true)

    // Keep the simulated 404 visible for the same duration as the Animated404 component,
    // then hide it and stop loading. This intentionally prevents the rest of the login
    // logic from running so the 404 is the visible result of the click.
    await new Promise<void>((resolve) => setTimeout(() => {
      setIsLoading(false)
      setShow404(false)
      resolve()
    }, 2500))
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-glow">
              <Logo className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-gradient-primary">
              Adustech
            </span>
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="card-enhanced card-hover animate-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-display text-center">Sign In</CardTitle>
            <CardDescription className="text-center mb-4">
              Enter your credentials below to access your account.
            </CardDescription>

            {/* Demo Credentials
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-3 text-center">Demo Credentials</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                  <span className="font-medium">Admin:</span>
                  <code className="bg-muted px-2 py-1 rounded">SuperAdmin / DefaultPass123</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                  <span className="font-medium">Student:</span>
                  <code className="bg-muted px-2 py-1 rounded">jane.doe@adustechonlinesystem.com / password123</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                  <span className="font-medium">Staff:</span>
                  <code className="bg-muted px-2 py-1 rounded">evelyn.reed@university.edu / DefaultPass123</code>
                </div>
              </div>
            </div> */}
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email or Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="m@example.com or SuperAdmin"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 px-4 bg-background border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 px-4 pr-12 bg-background border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-10 w-10 hover:bg-muted/50"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="w-full h-12 gradient-primary shadow-glow hover:shadow-xl text-white font-semibold interactive"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5 interactive">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-primary hover:text-accent transition-colors">
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Modal */}
      {loggedInUser && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={handleWelcomeModalClose}
          user={loggedInUser}
          isNewUser={false}
          onContinue={handleContinueToDashboard}
        />
      )}
      {/* 404 animation overlay */}
      <Animated404 isOpen={show404} onClose={() => setShow404(false)} durationMs={2500} />
    </div>
  )
}
