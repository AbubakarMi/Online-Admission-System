import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ApplicationsTable } from "@/components/admin/applications-table"
import { mockApplications } from "@/lib/data"

export default function AdminApplicationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Applications</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>
            View, search, and manage all student applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationsTable applications={mockApplications} />
        </CardContent>
      </Card>
    </div>
  );
}
