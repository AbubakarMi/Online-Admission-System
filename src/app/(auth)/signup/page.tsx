
"use client"

import Link from "next/link"

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
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import * as React from "react"
import { mockUsers } from "@/lib/data"
import { User } from "@/lib/types"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);


    const handleSignup = () => {
        // In a real app, you'd have more robust validation and an API call
        if (!fullName || !email || !password) {
            toast({
                title: "Signup Failed",
                description: "Please fill in all fields.",
                variant: "destructive"
            });
            return;
        }

        const newUser: User = {
            id: `usr_${Math.random().toString(36).substr(2, 9)}`,
            name: fullName,
            email: email,
            role: 'student', // Default role for all signups
            status: 'Active'
        };

        // Add to our mock data (in a real app, this would be an API call)
        mockUsers.push(newUser);
        
        // Simulate login
        sessionStorage.setItem("currentUser", JSON.stringify(newUser));

        toast({
            title: "Account Created!",
            description: `Welcome, ${fullName}! You can now start your application.`
        });

        router.push("/dashboard");
    }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create a student account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input id="full-name" placeholder="Jane Doe" required value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email} 
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="pr-10"
                />
                 <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" onClick={handleSignup}>
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
