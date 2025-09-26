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
  const reviewCount = mockApplications.filter(a => a.status === 'Under Review' || a.status === 'Submitted' || a.status === 'Correction Requested').length;
  const rejectedCount = mockApplications.filter(a => a.status === 'Rejected').length;

  const statCards = [
      { title: "Total Applications", value: totalApplications, icon: Users, description: "in the current admission cycle", href:"/admin/applications" },
      { title: "Applications Accepted", value: acceptedCount, icon: BarChart, description: `${totalApplications > 0 ? ((acceptedCount / totalApplications) * 100).toFixed(1) : 0}% acceptance rate`, href:"/admin/applications?status=Accepted" },
      { title: "Under Review", value: reviewCount, icon: Activity, description: "applications pending review", href:"/admin/applications?status=Under%20Review" },
      { title: "Rejected", value: rejectedCount, icon: XCircle, description: `${totalApplications > 0 ? ((rejectedCount / totalApplications) * 100).toFixed(1) : 0}% rejection rate`, href:"/admin/applications?status=Rejected" }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Admin Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {statCards.map(card => (
            <Link href={card.href} key={card.title}>
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {card.title}
                    </CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                        {card.description}
                    </p>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Application Analytics</CardTitle>
                        <CardDescription>
                           An overview of application trends, faculty distribution, and status breakdowns.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AnalyticsCharts applications={mockApplications} />
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
