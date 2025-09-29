
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
          {statCards.map((card, index) => (
            <Link href={card.href} key={card.title}>
                <Card className="group hover:bg-muted/50 transition-all duration-300 hover:scale-105 hover:shadow-lg border-l-4 border-l-transparent hover:border-l-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">
                        {card.title}
                    </CardTitle>
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <card.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{card.value}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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
                        <CardTitle>Application Submission Trends</CardTitle>
                        <CardDescription>
                           An overview of application volume over the past months.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AnalyticsCharts applications={mockApplications} chartTypes={['trend']} />
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                <Card className="h-fit">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" />
                        Quick Actions
                    </CardTitle>
                    <CardDescription>
                        Common administrative tasks
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <Button asChild variant="outline" className="justify-start group hover:bg-primary/5 hover:border-primary/20 transition-all">
                            <Link href="/admin/applications">
                                <div className="flex items-center w-full">
                                    <Users className="mr-3 h-4 w-4 text-primary" />
                                    <span className="flex-1 text-left">View All Applications</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start group hover:bg-primary/5 hover:border-primary/20 transition-all">
                            <Link href="/admin/verification">
                                <div className="flex items-center w-full">
                                    <FolderCheck className="mr-3 h-4 w-4 text-primary" />
                                    <span className="flex-1 text-left">Verify Documents</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start group hover:bg-primary/5 hover:border-primary/20 transition-all">
                            <Link href="/admin/reviewers">
                                <div className="flex items-center w-full">
                                    <UserCog className="mr-3 h-4 w-4 text-primary" />
                                    <span className="flex-1 text-left">Manage Reviewers</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start group hover:bg-primary/5 hover:border-primary/20 transition-all">
                            <Link href="/admin/settings">
                                <div className="flex items-center w-full">
                                    <Settings className="mr-3 h-4 w-4 text-primary" />
                                    <span className="flex-1 text-left">System Settings</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="h-fit">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-primary" />
                        Applicant Pool Summary
                    </CardTitle>
                    <CardDescription>
                        Generate an AI-powered summary of all applications using advanced analytics.
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
