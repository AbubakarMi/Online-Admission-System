import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">Adustech Online System</span>
        </Link>
      </div>
      {children}
      <footer className="absolute bottom-0 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
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
