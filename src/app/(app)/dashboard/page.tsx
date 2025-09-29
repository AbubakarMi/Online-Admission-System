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
import { CheckCircle2, AlertCircle, Clock, XCircle, FileText, User } from "lucide-react"

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

  const statusMap: { [key: string]: any } = {
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
    'Correction Requested': {
      value: 75,
      label: "Correction Requested",
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      description: "There is an issue with your application that requires your attention. Please review and resubmit.",
       color: "bg-yellow-500",
    }
  }

  const currentStatus = statusMap[application.status];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold font-display text-gradient-primary mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your application progress and stay updated with your journey.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">Application Active</span>
            </div>
          </div>
        </div>

        <Card className="card-enhanced animate-slide-up overflow-hidden" style={{ animationDelay: '100ms' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-display flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      {currentStatus.icon}
                    </div>
                    {currentStatus.label}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Last updated: {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  application.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                  application.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                  application.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {application.status}
                </div>
              </div>
            </CardHeader>
          </div>

          <CardContent className="space-y-8 pt-6">
            <div className="bg-gradient-to-r from-background to-secondary/30 p-6 rounded-xl border border-border/50">
              <p className="text-lg leading-relaxed text-foreground/90">
                {currentStatus.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Application Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    Submitted
                  </span>
                  <span className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${currentStatus.value >= 50 ? 'bg-accent' : 'bg-muted'}`}></div>
                    Under Review
                  </span>
                  <span className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${currentStatus.value >= 100 ? 'bg-accent' : 'bg-muted'}`}></div>
                    Decision
                  </span>
                </div>
                <div className="relative">
                  <Progress value={currentStatus.value} className="h-3" indicatorClassName={currentStatus.color} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentStatus.value}% Complete
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col sm:flex-row items-start sm:items-center gap-4 border-t pt-6 bg-gradient-to-r from-background to-secondary/30">
            {application.status === 'Accepted' && (
              <Button className="gradient-accent shadow-accent-glow hover:shadow-xl interactive h-12 px-8 font-semibold">
                Accept Offer
              </Button>
            )}
            {application.status === 'Accepted' || application.status === 'Rejected' ? (
              <Button variant="outline" className="interactive h-12 px-8">
                View Decision Letter
              </Button>
            ) : (
              <Button variant="outline" asChild className="interactive h-12 px-8">
                <Link href="/application">View/Edit Application</Link>
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "My Program",
              icon: <FileText className="h-5 w-5" />,
              primary: application.course,
              secondary: application.faculty,
              gradient: "from-blue-500/10 to-indigo-500/10",
              delay: "200ms"
            },
            {
              title: "Important Deadlines",
              icon: <AlertCircle className="h-5 w-5" />,
              primary: "Offer Acceptance",
              secondary: "July 15, 2024",
              gradient: "from-orange-500/10 to-red-500/10",
              delay: "300ms"
            },
            {
              title: "Admissions Contact",
              icon: <User className="h-5 w-5" />,
              primary: "John Doe",
              secondary: "admissions-officer@adustech.edu",
              gradient: "from-green-500/10 to-emerald-500/10",
              delay: "400ms"
            }
          ].map((item, index) => (
            <Card
              key={index}
              className="card-enhanced card-hover animate-slide-up relative overflow-hidden"
              style={{ animationDelay: item.delay }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}></div>
              <CardHeader className="relative flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                  {item.icon}
                </div>
              </CardHeader>
              <CardContent className="relative space-y-1">
                <div className="text-xl font-bold font-display">{item.primary}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.secondary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
