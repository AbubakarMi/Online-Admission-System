
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"

type Role = {
  name: string;
  description: string;
  userCount: number;
}

const initialRoles: Role[] = [
  { name: 'Admin', description: 'Full access to all system features', userCount: 1 },
  { name: 'Staff', description: 'Can review and manage applications', userCount: 2 },
  { name: 'Student', description: 'Can submit and track their application', userCount: 4 },
];


export default function RolesPage() {
  const { toast } = useToast();
  const [roles, setRoles] = React.useState<Role[]>(initialRoles);
  const [newRoleName, setNewRoleName] = React.useState('');
  const [newRoleDescription, setNewRoleDescription] = React.useState('');

  const handleAddRole = () => {
     if (!newRoleName || !newRoleDescription) {
        toast({
            title: "Error",
            description: "Please fill out all fields.",
            variant: "destructive"
        })
        return;
    }
    const newRole: Role = {
      name: newRoleName,
      description: newRoleDescription,
      userCount: 0,
    };
    setRoles(prev => [...prev, newRole]);
    toast({
      title: "Role Added",
      description: `The role "${newRole.name}" has been created.`,
    });
    setNewRoleName('');
    setNewRoleDescription('');
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Role Management</h1>
         <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle /> Add New Role
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Role</DialogTitle>
                    <DialogDescription>
                        Define a new role and its description. Permissions can be assigned later.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input id="role-name" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} placeholder="e.g., Admissions Head" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="role-desc">Description</Label>
                        <Input id="role-desc" value={newRoleDescription} onChange={(e) => setNewRoleDescription(e.target.value)} placeholder="e.g., Manages all admissions staff" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleAddRole}>Create Role</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Define and manage user roles and their associated permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.name}>
                  <TableCell className="font-medium">
                     <Badge variant={role.name === 'Admin' ? 'destructive' : role.name === 'Staff' ? 'secondary' : 'outline'} className="capitalize">{role.name}</Badge>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell className="text-right">{role.userCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
