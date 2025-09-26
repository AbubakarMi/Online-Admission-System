"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ReviewersTable } from "@/components/admin/reviewers-table"
import { mockReviewers } from "@/lib/data"
import { Reviewer } from "@/lib/types"


export default function ReviewersPage() {
  const { toast } = useToast()
  const [reviewers, setReviewers] = React.useState<Reviewer[]>(mockReviewers)
  const [newReviewerName, setNewReviewerName] = React.useState("")
  const [newReviewerEmail, setNewReviewerEmail] = React.useState("")

  const handleAddReviewer = () => {
    if (!newReviewerName || !newReviewerEmail) {
        toast({
            title: "Error",
            description: "Please fill out all fields.",
            variant: "destructive"
        })
        return;
    }

    const newReviewer: Reviewer = {
        id: `REV${(reviewers.length + 1).toString().padStart(2, '0')}`,
        name: newReviewerName,
        email: newReviewerEmail,
        assignedApplications: 0,
        status: 'Active'
    }

    setReviewers(prev => [...prev, newReviewer]);

    toast({
        title: "Reviewer Added",
        description: `${newReviewer.name} has been added to the list of reviewers.`
    })

    setNewReviewerName("")
    setNewReviewerEmail("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Manage Reviewers</h1>
         <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle /> Add New Reviewer
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Reviewer</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new reviewer. They will be sent an invitation to join.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={newReviewerName} onChange={(e) => setNewReviewerName(e.target.value)} placeholder="e.g., Dr. Jane Smith" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={newReviewerEmail} onChange={(e) => setNewReviewerEmail(e.target.value)} placeholder="e.g., jane.smith@university.edu" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleAddReviewer}>Add Reviewer</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Reviewers</CardTitle>
          <CardDescription>
            Assign, manage, and track application reviewers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewersTable reviewers={reviewers} />
        </CardContent>
      </Card>
    </div>
  );
}
