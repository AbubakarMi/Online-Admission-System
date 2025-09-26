import Link from "next/link"
import {
  Bell,
  FileText,
  Home,
  LayoutDashboard,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users,
  User,
  Menu,
  FolderKanban,
  FolderCheck,
  UserCog,
  BarChart,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { getCurrentUser } from "@/lib/auth"
import { UserNav } from "@/components/user-nav"
import { Logo } from "@/components/logo"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser();
  const userRole = user?.role || 'student';

  const navItems = {
    student: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/application", icon: FileText, label: "My Application" },
      { href: "/profile", icon: User, label: "My Profile" },
    ],
    admin: [
      { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/applications", icon: FolderKanban, label: "Applications" },
      { href: "/admin/verification", icon: FolderCheck, label: "Document Verification" },
      { href: "/admin/reviewers", icon: UserCog, label: "Reviewers" },
      { href: "/admin/reports", icon: BarChart, label: "Reports & Analytics" },
      { href: "/admin/notifications", icon: Bell, label: "Notifications" },
      { href: "/admin/users", icon: Users, label: "Users & Roles" },
      { href: "/admin/settings", icon: Settings, label: "Settings" },
    ],
    staff: [], // Add staff links if needed
  };

  const currentNavItems = navItems[userRole] || navItems.student;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="">CampusConnect</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {currentNavItems.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Contact support for assistance with your application.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="sr-only">CampusConnect</span>
                </Link>
                 {currentNavItems.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>
                      Contact support for assistance with your application.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
          <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
         <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">&copy; 2024 CampusConnect. All rights reserved.</p>
            <span className="text-xs text-muted-foreground mx-2 hidden sm:inline-block">|</span>
            <p className="text-xs text-muted-foreground">
                Powered by <Link href="https://nubenta-group.vercel.app/technology" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Nubenta Technology Limited</Link>
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Privacy
            </Link>
            </nav>
        </footer>
      </div>
    </div>
  )
}
