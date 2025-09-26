import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockApplications } from "@/lib/data"
import { Users, BarChart, Activity, XCircle, ArrowRight } from "lucide-react"
import { ApplicationSummary } from "@/components/admin/application-summary"
import Link from "next/link"

export default function AdminDashboardPage() {
  const totalApplications = mockApplications.length;
  const acceptedCount = mockApplications.filter(a => a.status === 'Accepted').length;
  const reviewCount = mockApplications.filter(a => a.status === 'Under Review').length;
  const rejectedCount = mockApplications.filter(a => a.status === 'Rejected').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Admin Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                in the current admission cycle
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications Accepted
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptedCount}</div>
              <p className="text-xs text-muted-foreground">
                {((acceptedCount / totalApplications) * 100).toFixed(1)}% acceptance rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewCount}</div>
              <p className="text-xs text-muted-foreground">
                applications pending review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedCount}</div>
               <p className="text-xs text-muted-foreground">
                {((rejectedCount / totalApplications) * 100).toFixed(1)}% rejection rate
              </p>
            </CardContent>
          </Card>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                    A quick look at the most recent applications submitted.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockApplications.slice(0, 3).map(app => (
                    <div key={app.id} className="flex items-center justify-between py-2 border-b last:border-none">
                      <div>
                        <p className="font-medium">{app.studentName}</p>
                        <p className="text-sm text-muted-foreground">{app.course}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.submissionDate}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/admin/applications">View All Applications <ArrowRight /></Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Applicant Pool Summary</CardTitle>
                <CardDescription>
                    Generate an AI-powered summary of all applications to identify key trends and top candidates.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <ApplicationSummary />
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
