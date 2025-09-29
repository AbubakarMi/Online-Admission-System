
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
import { Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import * as React from "react"
import { courseData } from "@/lib/data"
import {
  personalInfoSchema,
  academicHistorySchema,
  programSelectionSchema,
  validateFileUpload,
  type PersonalInfoFormData,
  type AcademicHistoryFormData,
  type ProgramSelectionFormData
} from "@/lib/validations"
import { cn } from "@/lib/utils"
import { ProgressSteps } from "@/components/ui/progress-steps"


interface FormErrors {
  [key: string]: string | undefined;
}

export default function ApplicationPage() {
    const { toast } = useToast()
    const [selectedFaculty, setSelectedFaculty] = React.useState<string>("")
    const [availableCourses, setAvailableCourses] = React.useState<string[]>([])
    const [selectedCourse, setSelectedCourse] = React.useState<string>("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errors, setErrors] = React.useState<FormErrors>({})
    const [currentStep, setCurrentStep] = React.useState(1)

    // Form data state
    const [personalInfo, setPersonalInfo] = React.useState<Partial<PersonalInfoFormData>>({})
    const [academicHistory, setAcademicHistory] = React.useState<Partial<AcademicHistoryFormData>>({})
    const [programSelection, setProgramSelection] = React.useState<Partial<ProgramSelectionFormData>>({})
    const [uploadedFiles, setUploadedFiles] = React.useState<{transcript?: File, recommendationLetter?: File}>({})

    const faculties = Object.keys(courseData)

    const handleFacultyChange = (faculty: string) => {
        setSelectedFaculty(faculty)
        setAvailableCourses(courseData[faculty as keyof typeof courseData] || [])
        setSelectedCourse("")
        setProgramSelection(prev => ({ ...prev, faculty, course: "" }))
    }

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {}

        try {
            switch (step) {
                case 1:
                    personalInfoSchema.parse(personalInfo)
                    break
                case 2:
                    academicHistorySchema.parse(academicHistory)
                    break
                case 3:
                    programSelectionSchema.parse(programSelection)
                    break
            }
            setErrors({})
            return true
        } catch (error: any) {
            if (error.errors) {
                error.errors.forEach((err: any) => {
                    newErrors[err.path[0]] = err.message
                })
            }
            setErrors(newErrors)
            return false
        }
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4))
        }
    }

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    const handleFileUpload = (type: 'transcript' | 'recommendationLetter', file: File | null) => {
        if (file) {
            const error = validateFileUpload(file)
            if (error) {
                toast({
                    title: "File Upload Error",
                    description: error,
                    variant: "destructive"
                })
                return
            }
            setUploadedFiles(prev => ({ ...prev, [type]: file }))
            toast({
                title: "File Uploaded",
                description: `${file.name} uploaded successfully`,
            })
        }
    }

    const handleSubmit = async () => {
        if (!validateStep(3)) return

        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            toast({
                title: "Application Submitted!",
                description: "Your application has been submitted successfully. You will receive a confirmation email shortly.",
            })

            // Reset form or redirect
            setCurrentStep(1)
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your application. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const steps = [
        { number: 1, title: "Personal", description: "Basic Information" },
        { number: 2, title: "Academic", description: "Education History" },
        { number: 3, title: "Program", description: "Course Selection" },
        { number: 4, title: "Documents", description: "File Upload" },
    ]

    const renderFormField = (
        id: string,
        label: string,
        value: string | number,
        onChange: (value: string | number) => void,
        type: string = "text",
        error?: string,
        placeholder?: string
    ) => (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
                placeholder={placeholder}
                className={cn(error && "border-destructive")}
            />
            {error && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}
        </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">University Application</h1>
        <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
        </div>
      </div>

      <ProgressSteps steps={steps} currentStep={currentStep} className="mb-6" />
      
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Please provide your personal details as they appear on official documents.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              {renderFormField(
                "firstName",
                "First Name",
                personalInfo.firstName || "",
                (value) => setPersonalInfo(prev => ({ ...prev, firstName: value as string })),
                "text",
                errors.firstName,
                "Jane"
              )}
              {renderFormField(
                "lastName",
                "Last Name",
                personalInfo.lastName || "",
                (value) => setPersonalInfo(prev => ({ ...prev, lastName: value as string })),
                "text",
                errors.lastName,
                "Doe"
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {renderFormField(
                "dateOfBirth",
                "Date of Birth",
                personalInfo.dateOfBirth || "",
                (value) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: value as string })),
                "date",
                errors.dateOfBirth
              )}
              {renderFormField(
                "email",
                "Email",
                personalInfo.email || "",
                (value) => setPersonalInfo(prev => ({ ...prev, email: value as string })),
                "email",
                errors.email,
                "jane.doe@example.com"
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Academic History</CardTitle>
            <CardDescription>Provide details about your previous education.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {renderFormField(
              "school",
              "High School/Previous University",
              academicHistory.school || "",
              (value) => setAcademicHistory(prev => ({ ...prev, school: value as string })),
              "text",
              errors.school,
              "Central High School"
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {renderFormField(
                "gpa",
                "GPA",
                academicHistory.gpa || "",
                (value) => setAcademicHistory(prev => ({ ...prev, gpa: value as number })),
                "number",
                errors.gpa,
                "3.8"
              )}
              {renderFormField(
                "graduationYear",
                "Graduation Year",
                academicHistory.graduationYear || "",
                (value) => setAcademicHistory(prev => ({ ...prev, graduationYear: value as number })),
                "number",
                errors.graduationYear,
                "2024"
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Program Selection</CardTitle>
            <CardDescription>Choose the program and faculty you wish to apply for.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="faculty">Faculty</Label>
                <Select onValueChange={handleFacultyChange} value={selectedFaculty}>
                  <SelectTrigger id="faculty" className={cn(errors.faculty && "border-destructive")}>
                    <SelectValue placeholder="Select a faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.faculty && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {errors.faculty}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="program">Program/Course</Label>
                <Select
                  value={selectedCourse}
                  onValueChange={(value) => {
                    setSelectedCourse(value)
                    setProgramSelection(prev => ({ ...prev, course: value }))
                  }}
                  disabled={!selectedFaculty}
                >
                  <SelectTrigger id="program" className={cn(errors.course && "border-destructive")}>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {errors.course}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="essay">Personal Essay</Label>
              <Textarea
                id="essay"
                placeholder="Tell us about yourself and why you are interested in this program..."
                rows={6}
                value={programSelection.essay || ""}
                onChange={(e) => setProgramSelection(prev => ({ ...prev, essay: e.target.value }))}
                className={cn(errors.essay && "border-destructive")}
              />
              {errors.essay && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.essay}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                {programSelection.essay?.length || 0} / 2000 characters
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>Upload necessary documents. Max file size: 5MB. Accepted formats: PDF.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="transcript">Academic Transcript</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="transcript"
                  type="file"
                  accept=".pdf"
                  className="flex-1"
                  onChange={(e) => handleFileUpload('transcript', e.target.files?.[0] || null)}
                />
                {uploadedFiles.transcript && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              {uploadedFiles.transcript && (
                <p className="text-sm text-green-600">
                  ✓ {uploadedFiles.transcript.name}
                </p>
              )}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="recommendation">Letter of Recommendation</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="recommendation"
                  type="file"
                  accept=".pdf"
                  className="flex-1"
                  onChange={(e) => handleFileUpload('recommendationLetter', e.target.files?.[0] || null)}
                />
                {uploadedFiles.recommendationLetter && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              {uploadedFiles.recommendationLetter && (
                <p className="text-sm text-green-600">
                  ✓ {uploadedFiles.recommendationLetter.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          {currentStep < 4 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
