import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"

export default function ApplicationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">University Application</h1>
      </div>
      
      <form className="grid gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>1. Personal Information</CardTitle>
            <CardDescription>Please provide your personal details as they appear on official documents.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane.doe@example.com" />
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic History */}
        <Card>
          <CardHeader>
            <CardTitle>2. Academic History</CardTitle>
            <CardDescription>Provide details about your previous education.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">High School/Previous University</Label>
              <Input id="school" placeholder="Central High School" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input id="gpa" type="number" step="0.01" placeholder="3.8" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gradYear">Graduation Year</Label>
                    <Input id="gradYear" type="number" placeholder="2024" />
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Program Selection */}
        <Card>
          <CardHeader>
            <CardTitle>3. Program Selection</CardTitle>
            <CardDescription>Choose the program and faculty you wish to apply for.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select>
                        <SelectTrigger id="faculty">
                            <SelectValue placeholder="Select a faculty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tech">Science & Technology</SelectItem>
                            <SelectItem value="business">Business School</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="arts">Arts & Humanities</SelectItem>
                            <SelectItem value="social">Social Sciences</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="program">Program/Course</Label>
                     <Select>
                        <SelectTrigger id="program">
                            <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="ds">Data Science</SelectItem>
                            <SelectItem value="ba">Business Administration</SelectItem>
                            <SelectItem value="me">Mechanical Engineering</SelectItem>
                            <SelectItem value="fa">Fine Arts</SelectItem>
                            <SelectItem value="psy">Psychology</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="essay">Personal Essay</Label>
              <Textarea id="essay" placeholder="Tell us about yourself and why you are interested in this program..." rows={6} />
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>4. Document Upload</CardTitle>
            <CardDescription>Upload necessary documents. Max file size: 5MB. Accepted formats: PDF.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
                <Label htmlFor="transcript">Academic Transcript</Label>
                <div className="flex items-center gap-2">
                    <Input id="transcript" type="file" className="flex-1" />
                    <Button variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
                </div>
            </div>
             <div className="grid gap-4">
                <Label htmlFor="recommendation">Letter of Recommendation</Label>
                <div className="flex items-center gap-2">
                    <Input id="recommendation" type="file" className="flex-1" />
                    <Button variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Submit Application</Button>
        </div>
      </form>
    </div>
  )
}
