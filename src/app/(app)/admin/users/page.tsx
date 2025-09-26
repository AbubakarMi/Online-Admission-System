
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
import { UsersTable } from "@/components/admin/users-table"
import { mockUsers } from "@/lib/data"
import { User } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function UsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = React.useState<User[]>(mockUsers)
  
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const handleDeactivate = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Inactive' } : u))
    toast({
      title: "User Deactivated",
      description: "The user's account has been set to Inactive.",
    })
  }

  const handleEdit = (user: User) => {
    setEditingUser(user);
  }

  const handleUpdateUser = () => {
    if (!editingUser) return;

    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    toast({
      title: "User Updated",
      description: `${editingUser.name}'s details have been updated.`,
    });
    setEditingUser(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Users</h1>
         <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle /> Invite New User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite New User</DialogTitle>
                    <DialogDescription>
                       Enter the email and assign a role. An invitation will be sent to them.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="e.g., new.user@university.edu" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={() => toast({ title: "Invitation Sent", description: "The user has been sent an email invitation."})}>Send Invitation</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage user accounts and system roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable 
            users={users} 
            onDeactivate={handleDeactivate}
            onEdit={handleEdit}
            />
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User Role</DialogTitle>
                    <DialogDescription>
                       Change the role for {editingUser?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid gap-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input id="edit-name" value={editingUser?.name || ''} readOnly disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-role">Role</Label>
                        <Select 
                            value={editingUser?.role || ''}
                            onValueChange={(value) => editingUser && setEditingUser({...editingUser, role: value as User['role']})}
                            disabled={editingUser?.role === 'student'}
                        >
                            <SelectTrigger id="edit-role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleUpdateUser}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
