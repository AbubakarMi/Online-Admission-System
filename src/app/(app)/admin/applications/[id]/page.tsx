import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockApplications, mockStudentProfile } from "@/lib/data"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, MinusCircle, Phone, ThumbsDown, ThumbsUp } from "lucide-react"

type Params = {
  id: string
}

export default function ApplicationDetailPage({ params }: { params: Params }) {
  const application = mockApplications.find((app) => app.id === params.id)
  const profile = mockStudentProfile // Using mock profile for now

  if (!application) {
    notFound()
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Accepted":
        return "default"
      case "Under Review":
        return "secondary"
      case "Rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Application Details
        </h1>
        <div className="flex items-center gap-2">
            <Button variant="outline">Request Correction</Button>
            <Button variant="destructive" className="gap-2"><ThumbsDown />Reject</Button>
            <Button className="bg-accent hover:bg-accent/90 gap-2"><ThumbsUp />Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Applicant Information</CardTitle>
              <CardDescription>
                <Badge variant={getStatusBadgeVariant(application.status)}>{application.status}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-2xl">{application.studentName}</p>
                  <p className="text-muted-foreground">{application.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{application.course}</p>
                  <p className="text-muted-foreground">{application.faculty}</p>
                </div>
              </div>
              <Separator />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <p className="font-medium">Personal Details</p>
                  <p><strong>Date of Birth:</strong> {profile.personal.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {profile.personal.gender}</p>
                  <p><strong>Nationality:</strong> {profile.personal.nationality}</p>
                 </div>
                 <div>
                   <p className="font-medium">Contact</p>
                   <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.contact.email}</span>
                   </div>
                   <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.contact.phone}</span>
                   </div>
                 </div>
               </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Academic History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p><strong>High School:</strong> {profile.academic.highSchool}</p>
                <p><strong>Graduation Year:</strong> {profile.academic.graduationYear}</p>
                <p><strong>GPA:</strong> {profile.academic.gpa}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Verify the applicant's submitted documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span>Academic Transcript</span>
                    <Button variant="secondary" size="sm">View</Button>
                </div>
                 <div className="flex items-center justify-between">
                    <span>Recommendation Letter</span>
                    <Button variant="secondary" size="sm">View</Button>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Review & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                 <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Documents Verified</span>
                 </div>
                 <span className="text-sm text-muted-foreground">by Admin User</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                 <div className="flex items-center gap-2">
                    <MinusCircle className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">No Reviewer Assigned</span>
                 </div>
                 <Button variant="outline" size="sm">Assign</Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
