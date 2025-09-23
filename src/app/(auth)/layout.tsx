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
          <span className="text-xl font-semibold">CampusConnect</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
