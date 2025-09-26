import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          User Management
        </h1>
        <div className="flex items-center gap-2">
            <Button asChild variant="outline">
                <Link href="/admin/users">Users</Link>
            </Button>
            <Button asChild>
                <Link href="/admin/roles">Roles</Link>
            </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
