
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CalendarIcon, Download, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"


export default function GenerateReportPage() {
    const router = useRouter()
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 0, 1),
        to: new Date(),
    })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Generate a New Report</h1>
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle>Configure Your Report</CardTitle>
            <CardDescription>Select the filters and parameters for the report you want to generate.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="grid gap-2">
                    <Label>Date Range</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select>
                        <SelectTrigger id="faculty">
                            <SelectValue placeholder="All Faculties" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Faculties</SelectItem>
                            <SelectItem value="tech">Science & Technology</SelectItem>
                            <SelectItem value="business">Business School</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="arts">Arts & Humanities</SelectItem>
                            <SelectItem value="social">Social Sciences</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Application Status</Label>
                    <Select>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Submitted">Submitted</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="Accepted">Accepted</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-4">
                <Label>Include in Report</Label>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="personal-details" defaultChecked />
                        <label htmlFor="personal-details" className="text-sm font-medium leading-none">
                            Personal Details
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="academic-history" defaultChecked />
                        <label htmlFor="academic-history" className="text-sm font-medium leading-none">
                            Academic History
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="program-choice" defaultChecked />
                        <label htmlFor="program-choice" className="text-sm font-medium leading-none">
                            Program Choice
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="reviewer-notes" />
                        <label htmlFor="reviewer-notes" className="text-sm font-medium leading-none">
                            Reviewer Notes
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                 <Button variant="outline" onClick={() => alert("Generating PDF report...")} className="gap-2">
                    <FileText />
                    Generate PDF
                </Button>
                <Button onClick={() => alert("Generating CSV report...")} className="gap-2">
                    <Download />
                    Generate CSV
                </Button>
            </div>
        </CardContent>
       </Card>
    </div>
  )
}
