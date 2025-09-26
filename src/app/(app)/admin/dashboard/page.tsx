import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockApplications } from "@/lib/data"
import { Users, BarChart, Activity, XCircle, ArrowRight, FolderCheck, UserCog, Settings } from "lucide-react"
import { ApplicationSummary } from "@/components/admin/application-summary"
import Link from "next/link"
import { AnalyticsCharts } from "@/components/admin/analytics-charts"

export default function AdminDashboardPage() {
  const totalApplications = mockApplications.length;
  const acceptedCount = mockApplications.filter(a => a.status === 'Accepted').length;
  const reviewCount = mockApplications.filter(a => a.status === 'Under Review' || a.status === 'Submitted').length;
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
                {totalApplications > 0 ? ((acceptedCount / totalApplications) * 100).toFixed(1) : 0}% acceptance rate
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
                {totalApplications > 0 ? ((rejectedCount / totalApplications) * 100).toFixed(1) : 0}% rejection rate
              </p>
            </CardContent>
          </Card>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Application Trends</CardTitle>
                        <CardDescription>
                            Visualize application submission trends over the past year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AnalyticsCharts applications={mockApplications} chartTypes={['trend']} />
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                <Card>
                    <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/applications">View All Applications <ArrowRight className="ml-auto"/></Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/verification">Verify Documents <FolderCheck className="ml-auto"/></Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/reviewers">Manage Reviewers <UserCog className="ml-auto"/></Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/settings">System Settings <Settings className="ml-auto"/></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                    <CardTitle>Applicant Pool Summary</CardTitle>
                    <CardDescription>
                        Generate an AI-powered summary of all applications.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ApplicationSummary />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
