import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ApplicationsTable } from "@/components/admin/applications-table"
import { ApplicationSummary } from "@/components/admin/application-summary"
import { mockApplications } from "@/lib/data"
import { Users, BarChart, Activity, XCircle } from "lucide-react"

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
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                View, search, and manage all student applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationsTable applications={mockApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
