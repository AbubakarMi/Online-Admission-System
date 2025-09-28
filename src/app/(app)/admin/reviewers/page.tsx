
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
import { mockReviewers, mockUsers } from "@/lib/data"
import { Reviewer, User } from "@/lib/types"


export default function ReviewersPage() {
  const { toast } = useToast()
  const [reviewers, setReviewers] = React.useState<Reviewer[]>(mockReviewers)
  const [users, setUsers] = React.useState<User[]>(mockUsers)
  const [newReviewerName, setNewReviewerName] = React.useState("")
  const [newReviewerEmail, setNewReviewerEmail] = React.useState("")

  const [editingReviewer, setEditingReviewer] = React.useState<Reviewer | null>(null);

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

    // Also add to the main users list
    const newUser: User = {
       id: `usr_${(users.length + 1).toString().padStart(3, '0')}`,
       name: newReviewerName,
       email: newReviewerEmail,
       role: 'staff', // 'staff' is the role for reviewers
       status: 'Active'
    }
    mockUsers.push(newUser); // In a real app, this would be an API call

    toast({
        title: "Reviewer Added",
        description: `${newReviewer.name} has been added. They can now log in with their email and the default password.`
    })

    setNewReviewerName("")
    setNewReviewerEmail("")
  }

  const handleDeactivate = (reviewerId: string) => {
    setReviewers(reviewers.map(r => r.id === reviewerId ? { ...r, status: 'Inactive' } : r))
    toast({
      title: "Reviewer Deactivated",
      description: "The reviewer's status has been set to Inactive.",
    })
  }

  const handleEdit = (reviewer: Reviewer) => {
    setEditingReviewer(reviewer);
  }

  const handleUpdateReviewer = () => {
    if (!editingReviewer) return;

    setReviewers(reviewers.map(r => r.id === editingReviewer.id ? editingReviewer : r));
    toast({
      title: "Reviewer Updated",
      description: `${editingReviewer.name}'s details have been updated.`,
    });
    setEditingReviewer(null);
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
                        Enter the details for the new reviewer. They will be able to log in with their email and the default password.
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
          <ReviewersTable 
            reviewers={reviewers} 
            onDeactivate={handleDeactivate}
            onEdit={handleEdit}
            />
        </CardContent>
      </Card>

      {/* Edit Reviewer Dialog */}
      <Dialog open={!!editingReviewer} onOpenChange={(isOpen) => !isOpen && setEditingReviewer(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Reviewer</DialogTitle>
                    <DialogDescription>
                       Update the details for {editingReviewer?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input id="edit-name" value={editingReviewer?.name || ''} onChange={(e) => editingReviewer && setEditingReviewer({...editingReviewer, name: e.target.value})} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input id="edit-email" type="email" value={editingReviewer?.email || ''} onChange={(e) => editingReviewer && setEditingReviewer({...editingReviewer, email: e.target.value})} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setEditingReviewer(null)}>Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleUpdateReviewer}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
