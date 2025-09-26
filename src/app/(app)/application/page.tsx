
"use client"

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
import { Upload } from "lucide-react"
import * as React from "react"
import { courseData } from "@/lib/data"


export default function ApplicationPage() {
    const [selectedFaculty, setSelectedFaculty] = React.useState<string>("");
    const [availableCourses, setAvailableCourses] = React.useState<string[]>([]);
    const [selectedCourse, setSelectedCourse] = React.useState<string>("");

    const faculties = Object.keys(courseData);

    const handleFacultyChange = (faculty: string) => {
        setSelectedFaculty(faculty);
        setAvailableCourses(courseData[faculty as keyof typeof courseData] || []);
        setSelectedCourse(""); // Reset course selection
    }


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
                    <Select onValueChange={handleFacultyChange} value={selectedFaculty}>
                        <SelectTrigger id="faculty">
                            <SelectValue placeholder="Select a faculty" />
                        </SelectTrigger>
                        <SelectContent>
                            {faculties.map((faculty) => (
                                <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="program">Program/Course</Label>
                     <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={!selectedFaculty}>
                        <SelectTrigger id="program">
                            <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableCourses.map((course) => (
                                <SelectItem key={course} value={course}>{course}</SelectItem>
                            ))}
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
