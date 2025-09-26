
"use client"

import * as React from "react"
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
import { Switch } from "@/components/ui/switch"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
    const { toast } = useToast();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 7, 1),
        to: new Date(2024, 9, 30),
    });

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "Your changes have been successfully saved."
        })
    }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Settings</h1>
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label>Theme</Label>
                            <p className="text-sm text-muted-foreground">Select a light or dark theme for the application.</p>
                        </div>
                        <Select defaultValue="system">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <Separator />
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="primary-color">Primary Color</Label>
                            <div className="flex items-center gap-2">
                                <Input id="primary-color" defaultValue="#6c3f99" className="w-24"/>
                                <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: "#6c3f99" }}></div>
                           </div>
                           <p className="text-sm text-muted-foreground">Used for main buttons, links, and highlights.</p>
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="accent-color">Accent Color</Label>
                           <div className="flex items-center gap-2">
                                <Input id="accent-color" defaultValue="#2edc76" className="w-24"/>
                                <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: "#2edc76" }}></div>
                           </div>
                           <p className="text-sm text-muted-foreground">Used for success states and special call-to-actions.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage general application settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="university-name">University Name</Label>
                        <Input id="university-name" defaultValue="CampusConnect University" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="contact-email">Public Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="admissions@campusconnect.edu" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Admission Cycle</CardTitle>
                    <CardDescription>Define the start and end dates for the application period.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label>Application Period</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal md:w-[300px]",
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
                </CardContent>
            </Card>

             <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    </div>
  )
}
