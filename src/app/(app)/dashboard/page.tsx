import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, AlertCircle, Clock, XCircle, FileText } from "lucide-react"

import { getCurrentUser } from "@/lib/auth"
import { mockApplications } from "@/lib/data"
import Link from "next/link"

export default async function StudentDashboard() {
  const user = await getCurrentUser()
  const application = mockApplications.find(app => app.studentId === user?.id)

  if (!user || !application) {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">No Application Found</h3>
                <p className="text-sm text-muted-foreground">
                    You have not started an application yet.
                </p>
                <Button className="mt-4" asChild>
                    <Link href="/application">Start Application</Link>
                </Button>
            </div>
      </div>
    )
  }

  const statusMap = {
    Submitted: {
      value: 25,
      label: "Application Submitted",
      icon: <CheckCircle2 className="h-5 w-5 text-blue-500" />,
      description: "We have received your application. It will be reviewed by our admissions team shortly.",
      color: "bg-blue-500",
    },
    'Under Review': {
      value: 50,
      label: "Under Review",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      description: "Your application is currently being reviewed by the admissions committee.",
      color: "bg-orange-500",
    },
    Accepted: {
      value: 100,
      label: "Accepted!",
      icon: <CheckCircle2 className="h-5 w-5 text-accent" />,
      description: "Congratulations! You have been accepted. Please check your offer details.",
      color: "bg-accent",
    },
    Rejected: {
      value: 100,
      label: "Decision Made",
      icon: <XCircle className="h-5 w-5 text-destructive" />,
      description: "A decision has been made on your application. Please check the portal for details.",
      color: "bg-destructive",
    },
  }

  const currentStatus = statusMap[application.status];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Welcome, {user.name}!</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application Status: {currentStatus.label}</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 flex-shrink-0">{currentStatus.icon}</div>
            <div className="flex-1">
              <p className="font-medium">{currentStatus.description}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Submitted</span>
              <span>Review</span>
              <span>Decision</span>
            </div>
            <Progress value={currentStatus.value} className="w-full" indicatorClassName={currentStatus.color} />
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row items-start sm:items-center gap-4 border-t pt-6">
          {application.status === 'Accepted' && (
            <Button className="bg-accent hover:bg-accent/90">Accept Offer</Button>
          )}
          {application.status === 'Accepted' || application.status === 'Rejected' ? (
             <Button variant="secondary">View Decision Letter</Button>
          ) : (
            <Button variant="secondary" asChild><Link href="/application">View/Edit Application</Link></Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Program</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{application.course}</div>
            <p className="text-xs text-muted-foreground">{application.faculty}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Important Deadlines</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Offer Acceptance: <span className="font-normal">July 15, 2024</span></div>
            <div className="text-sm font-medium">Tuition Deposit: <span className="font-normal">August 1, 2024</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Admissions Contact</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-sm font-medium">John Doe</div>
            <p className="text-xs text-muted-foreground">admissions-officer@campus.connect</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
