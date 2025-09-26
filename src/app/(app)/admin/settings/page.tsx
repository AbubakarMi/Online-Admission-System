
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, BellRing } from "lucide-react"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
    const { toast } = useToast();
    const [applicationPeriod, setApplicationPeriod] = React.useState<DateRange | undefined>({
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
            <h1 className="text-lg font-semibold md:text-2xl font-headline">System Settings</h1>
        </div>
        
        <div className="space-y-8">
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
                                !applicationPeriod && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {applicationPeriod?.from ? (
                                applicationPeriod.to ? (
                                    <>
                                    {format(applicationPeriod.from, "LLL dd, y")} -{" "}
                                    {format(applicationPeriod.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(applicationPeriod.from, "LLL dd, y")
                                )
                                ) : (
                                <span>Pick a date range</span>
                                )}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={applicationPeriod?.from}
                                selected={applicationPeriod}
                                onSelect={setApplicationPeriod}
                                numberOfMonths={2}
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BellRing className="h-5 w-5" />
                        <CardTitle>Notification Settings</CardTitle>
                    </div>
                    <CardDescription>Configure how and when notifications are sent to administrators and staff.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="new-app-notifs" className="font-semibold">New Application Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Send an email notification when a new student application is submitted.
                            </p>
                        </div>
                        <Switch id="new-app-notifs" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="status-change-notifs" className="font-semibold">Status Change Alerts</Label>
                             <p className="text-sm text-muted-foreground">
                                Notify relevant staff when an application status is updated (e.g., to 'Accepted' or 'Rejected').
                            </p>
                        </div>
                        <Switch id="status-change-notifs" />
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
