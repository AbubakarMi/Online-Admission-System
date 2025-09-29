import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-landing');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-subtle">
      <header className="px-6 lg:px-8 h-20 flex items-center glass fixed top-0 w-full z-50 border-b border-white/10">
        <Link href="#" className="flex items-center justify-center group" prefetch={false}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-glow group-hover:shadow-xl transition-all duration-300">
            <Logo className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-display font-bold text-gradient-primary">
            Adustech
          </span>
          <span className="sr-only">Adustech Online System</span>
        </Link>
        <nav className="ml-auto flex gap-3 sm:gap-4">
          <Link href="/login">
            <Button variant="ghost" size="lg" className="interactive text-foreground/80 hover:text-primary">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" className="gradient-primary shadow-glow hover:shadow-xl interactive">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-20">
        <section className="relative w-full min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-primary/20" />
          <div className="absolute inset-0 bg-mesh opacity-20" />

          <div className="relative container px-6 md:px-8 z-10">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="space-y-6 animate-slide-up">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/20 text-white/90 text-sm font-medium mb-6">
                  🎓 Welcome to the Future of Education
                </div>

                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.9]">
                  Your Journey to
                  <span className="block bg-gradient-to-r from-accent via-accent/90 to-primary bg-clip-text text-transparent mt-2">
                    Higher Education
                  </span>
                  <span className="block text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 font-normal">
                    Starts Here
                  </span>
                </h1>

                <p className="text-xl text-white/80 md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed font-light">
                  Experience a <span className="text-accent font-medium">seamless</span> and
                  <span className="text-accent font-medium"> modern</span> application process.
                  Create your profile, submit applications, and track your journey to success.
                </p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row justify-center pt-8 animate-slide-up">
                <Button size="lg" asChild className="h-16 px-12 text-lg gradient-accent shadow-accent-glow hover:shadow-2xl interactive text-white font-semibold">
                  <Link href="/signup">
                    <span>Apply Now</span>
                    <svg className="ml-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-16 px-12 text-lg bg-white/20 backdrop-blur-md border-white/40 text-white hover:bg-white/30 hover:border-white/60 interactive font-semibold shadow-lg">
                  <Link href="/login">
                    <span>Student Login</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl"></div>
          </div>
          <div className="absolute bottom-1/4 right-10 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
          </div>
        </section>
        <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-subtle relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30"></div>
          <div className="container px-6 md:px-8 relative z-10">
            <div className="text-center mb-20 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                ✨ Modern Application Experience
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-display mb-6 text-gradient-primary">
                Streamlined Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience a revolutionary approach to university applications with our state-of-the-art platform designed for the modern student.
              </p>
            </div>

            <div className="grid gap-12 lg:gap-16 md:grid-cols-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  ),
                  title: "Create Your Profile",
                  description: "Build a comprehensive profile showcasing your academic achievements, personal details, and aspirations in an intuitive interface.",
                  delay: "0ms"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                  ),
                  title: "Submit Applications",
                  description: "Apply to your desired courses and programs with our step-by-step application form, complete with validation and progress tracking.",
                  delay: "200ms"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ),
                  title: "Track Your Status",
                  description: "Monitor your application progress in real-time through your personalized dashboard with instant notifications and updates.",
                  delay: "400ms"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group card-enhanced card-hover p-8 text-center animate-slide-up"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="relative mb-8">
                    <div className="mx-auto w-20 h-20 rounded-2xl gradient-primary shadow-glow group-hover:shadow-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full shadow-accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="text-2xl font-bold font-display mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-t from-secondary/50 to-background border-t border-border/50">
        <div className="container px-6 md:px-8 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-glow">
                  <Logo className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-display font-bold text-gradient-primary">
                  Adustech
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Empowering students with seamless access to higher education through innovative technology and exceptional user experience.
              </p>
            </div>

            <div className="lg:col-span-2 grid gap-8 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
                <nav className="space-y-2">
                  <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                  <Link href="/programs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Programs
                  </Link>
                  <Link href="/support" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </Link>
                </nav>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                <nav className="space-y-2">
                  <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/cookies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </nav>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">support@adustech.edu</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Adustech Online System. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by{' '}
              <Link
                href="https://nubenta-group.vercel.app/technology"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-accent transition-colors"
              >
                Nubenta Technology Limited
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
