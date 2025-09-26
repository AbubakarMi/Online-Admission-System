"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { mockApplications, mockStudentProfile } from "@/lib/data"
import { notFound, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, MinusCircle, Phone, ThumbsDown, ThumbsUp, ArrowLeft, UserCheck } from "lucide-react"
import React from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Application } from "@/lib/types"

type Params = {
  id: string
}

export default function ApplicationDetailPage({ params }: { params: Params }) {
  const router = useRouter()
  const { toast } = useToast()
  
  const [application, setApplication] = React.useState(() => 
    mockApplications.find((app) => app.id === params.id)
  )
  const profile = mockStudentProfile
  const [isReviewerAssigned, setIsReviewerAssigned] = React.useState(false);

  if (!application) {
    return notFound()
  }

  const handleUpdateStatus = (newStatus: Application["status"]) => {
    setApplication(prev => prev ? { ...prev, status: newStatus } : prev)
    
    const appIndex = mockApplications.findIndex(a => a.id === params.id);
    if (appIndex !== -1) {
      mockApplications[appIndex].status = newStatus;
    }

    toast({
      title: `Application ${newStatus}`,
      description: `${application.studentName}'s application has been updated to ${newStatus}.`,
    });
  }

  const handleAssignReviewer = () => {
    setIsReviewerAssigned(true);
     toast({
      title: "Reviewer Assigned",
      description: `A reviewer has been assigned to ${application.studentName}'s application.`,
    });
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Accepted":
        return "default"
      case "Under Review":
        return "secondary"
      case "Rejected":
        return "destructive"
      case "Correction Requested":
        return "outline" // Or another color
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-lg font-semibold md:text-2xl font-headline">
            Application Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleUpdateStatus('Correction Requested')}>Request Correction</Button>
            <Button variant="destructive" className="gap-2" onClick={() => handleUpdateStatus('Rejected')} disabled={application.status === 'Rejected'}><ThumbsDown />Reject</Button>
            <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={() => handleUpdateStatus('Accepted')} disabled={application.status === 'Accepted'}><ThumbsUp />Approve</Button>
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
                    <Button variant="secondary" size="sm" asChild>
                      <Link href="/admin/verification">View</Link>
                    </Button>
                </div>
                 <div className="flex items-center justify-between">
                    <span>Recommendation Letter</span>
                     <Button variant="secondary" size="sm" asChild>
                      <Link href="/admin/verification">View</Link>
                    </Button>
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
               {isReviewerAssigned ? (
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-blue-500" />
                        <span className="font-semibold">Reviewer Assigned</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Dr. Evelyn Reed</span>
                  </div>
               ) : (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MinusCircle className="h-5 w-5 text-gray-500" />
                      <span className="font-semibold">No Reviewer Assigned</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Assign</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Reviewer</DialogTitle>
                          <DialogDescription>
                            Select a reviewer to assign to this application. This will notify them to begin their review.
                          </DialogDescription>
                        </DialogHeader>
                        {/* In a real app, this would be a list of actual reviewers */}
                        <div className="py-4">
                          <p>Assigning to: <strong>Dr. Evelyn Reed</strong></p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                             <Button type="button" variant="secondary">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button type="button" onClick={handleAssignReviewer}>Confirm & Assign</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
