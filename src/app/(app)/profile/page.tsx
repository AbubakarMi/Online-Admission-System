import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { mockStudentProfile } from "@/lib/data"

export default function ProfilePage() {
  const profile = mockStudentProfile;

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">My Profile</h1>
        </div>
        <form>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue={profile.personal.fullName} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" type="date" defaultValue={profile.personal.dateOfBirth} />
                        </div>
                    </div>
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Gender</Label>
                             <Select name="gender" defaultValue={profile.personal.gender}>
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input id="nationality" defaultValue={profile.personal.nationality} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Separator className="my-6" />

             <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Ensure your contact details are up-to-date.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={profile.contact.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue={profile.contact.phone} />
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="address">Mailing Address</Label>
                        <Input id="address" defaultValue={profile.contact.address} />
                    </div>
                </CardContent>
            </Card>

            <Separator className="my-6" />

            <Card>
                <CardHeader>
                    <CardTitle>Academic History</CardTitle>
                    <CardDescription>Your previous academic records.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="highSchool">High School</Label>
                            <Input id="highSchool" defaultValue={profile.academic.highSchool} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="graduationYear">Graduation Year</Label>
                            <Input id="graduationYear" type="number" defaultValue={profile.academic.graduationYear} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="gpa">Final GPA</Label>
                        <Input id="gpa" type="number" step="0.1" defaultValue={profile.academic.gpa} />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
        </form>
    </div>
  )
}
