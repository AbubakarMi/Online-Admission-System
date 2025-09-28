import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
        <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
             <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <Logo className="h-8 w-8 text-primary" />
                <span className="sr-only">Adustech Online System</span>
            </Link>
             <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href="/login">
                    <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                    <Button>Sign Up</Button>
                </Link>
            </nav>
        </header>

         <main className="flex-1 flex items-center justify-center p-4 pt-20">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <h2>1. Introduction</h2>
                    <p>Welcome to Adustech Online System! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.</p>

                    <h2>2. Use of Our Services</h2>
                    <p>You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the services:</p>
                    <ul>
                        <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                        <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                        <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the platform.</li>
                    </ul>

                    <h2>3. Accounts</h2>
                    <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>

                     <h2>4. Intellectual Property</h2>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Adustech Online System and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

                    <h2>5. Termination</h2>
                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    
                    <h2>6. Limitation of Liability</h2>
                    <p>In no event shall Adustech Online System, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    
                    <h2>7. Changes</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
                    
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at support@adustechonlinesystem.com.</p>
                </CardContent>
            </Card>
        </main>
        
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
            <p className="text-xs text-muted-foreground">&copy; 2024 Adustech Online System. All rights reserved.</p>
            <span className="text-xs text-muted-foreground mx-2 hidden sm:inline-block">|</span>
            <p className="text-xs text-muted-foreground">
                Powered by <Link href="https://nubenta-group.vercel.app/technology" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Nubenta Technology Limited</Link>
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Privacy
            </Link>
            </nav>
        </footer>
    </div>
  );
}
