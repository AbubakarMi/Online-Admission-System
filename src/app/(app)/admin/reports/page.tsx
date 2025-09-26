
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockApplications } from "@/lib/data"
import { BarChart3, Check, X, Hourglass, Download, FileText } from "lucide-react"
import { AnalyticsCharts } from "@/components/admin/analytics-charts"
import Link from "next/link"

export default function ReportsPage() {
    const totalApplications = mockApplications.length;
    const acceptedCount = mockApplications.filter(a => a.status === 'Accepted').length;
    const rejectedCount = mockApplications.filter(a => a.status === 'Rejected').length;
    const underReviewCount = mockApplications.filter(a => a.status === 'Under Review').length;
    const submittedCount = mockApplications.filter(a => a.status === 'Submitted').length;

    const acceptanceRate = totalApplications > 0 ? (acceptedCount / totalApplications) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Reports & Analytics</h1>
         <Button asChild variant="outline" className="gap-2">
            <Link href="/admin/reports/generate">
                <Download />
                Generate Report
            </Link>
        </Button>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Based on {totalApplications} total applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accepted</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedCount}</div>
             <p className="text-xs text-muted-foreground">
              Across all faculties
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rejected</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
             <p className="text-xs text-muted-foreground">
             Across all faculties
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{underReviewCount + submittedCount}</div>
            <p className="text-xs text-muted-foreground">
              {underReviewCount} under review, {submittedCount} newly submitted
            </p>
          </CardContent>
        </Card>
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Application Analytics</CardTitle>
                <CardDescription>
                Visualize application trends, faculty distribution, and status breakdowns.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AnalyticsCharts applications={mockApplications} />
            </CardContent>
        </Card>

    </div>
  )
}
