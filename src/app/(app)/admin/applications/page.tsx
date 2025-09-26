
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ApplicationsTable } from "@/components/admin/applications-table"
import { mockApplications } from "@/lib/data"
import { Application } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminApplicationsPage() {
  const [applications, setApplications] = React.useState<Application[]>(mockApplications);

  const underReviewApps = applications.filter(a => a.status === 'Under Review' || a.status === 'Submitted' || a.status === 'Correction Requested');
  const approvedApps = applications.filter(a => a.status === 'Accepted');
  const rejectedApps = applications.filter(a => a.status === 'Rejected');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Applications</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>
            View, search, and manage all student applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Tabs defaultValue="review">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="review">Under Review ({underReviewApps.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedApps.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedApps.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="review">
              <ApplicationsTable applications={underReviewApps} />
            </TabsContent>
            <TabsContent value="approved">
              <ApplicationsTable applications={approvedApps} />
            </TabsContent>
            <TabsContent value="rejected">
              <ApplicationsTable applications={rejectedApps} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
