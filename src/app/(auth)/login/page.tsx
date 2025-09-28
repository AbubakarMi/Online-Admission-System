
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

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    let user: User | undefined;

    // Admin Login
    if (email === "SuperAdmin" && password === "DefaultPass123") {
      user = mockUsers.find(u => u.role === 'admin')
    } else {
    // Reviewer/Student Login
      user = mockUsers.find(u => u.email === email)
       if (user && user.role !== 'admin' && password !== 'DefaultPass123') {
           // For prototype, any password for non-admin is fine if it's not the default
           // In a real app, you'd check a hashed password.
            if (password !== 'password123') { // Let's assume a generic student password
                 user = undefined;
            }
       } else if (user && user.role === 'staff' && password !== 'DefaultPass123') {
           user = undefined;
       }
    }


    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user))
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      })
      if (user.role === 'admin' || user.role === 'staff') {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account. Use 'SuperAdmin' for admin login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="m@example.com or SuperAdmin"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
