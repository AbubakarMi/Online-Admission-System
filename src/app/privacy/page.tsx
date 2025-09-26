import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
        <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
             <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <Logo className="h-8 w-8 text-primary" />
                <span className="sr-only">CampusConnect</span>
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
                    <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us when you create an account, fill out an application, or otherwise communicate with us. This information may include:</p>
                    <ul>
                        <li>Personal details (name, date of birth, gender, nationality)</li>
                        <li>Contact information (email address, phone number, mailing address)</li>
                        <li>Academic history (high school, graduation year, GPA)</li>
                        <li>Documents you upload (transcripts, letters of recommendation)</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Process your application for admission.</li>
                        <li>Communicate with you about your application status.</li>
                        <li>Verify your identity and academic credentials.</li>
                        <li>Improve and operate our services.</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share your information with:</p>
                     <ul>
                        <li>University staff and administrators involved in the admissions process.</li>
                        <li>Service providers who perform services on our behalf.</li>
                        <li>As required by law or to protect our rights.</li>
                    </ul>

                     <h2>4. Data Security</h2>
                    <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

                    <h2>5. Your Choices</h2>
                    <p>You may review, update, or correct your account information at any time by logging into your account. If you wish to delete your account, please contact us.</p>
                    
                    <h2>6. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    
                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at privacy@campusconnect.com.</p>
                </CardContent>
            </Card>
        </main>
        
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
            <p className="text-xs text-muted-foreground">&copy; 2024 CampusConnect. All rights reserved.</p>
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
