
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DocumentVerificationTable, Document } from "@/components/admin/document-verification-table"
import { mockDocuments } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function DocumentVerificationPage() {
  const { toast } = useToast()
  const [documents, setDocuments] = React.useState<Document[]>(mockDocuments)

  const handleStatusChange = (docId: string, newStatus: Document["status"]) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setDocuments(currentDocs =>
        currentDocs.map(d =>
          d.id === docId ? { ...d, status: newStatus } : d
        )
      )
      toast({
          title: `Document ${newStatus}`,
          description: `${doc.applicantName}'s ${doc.documentType} has been marked as ${newStatus}.`
      })
    }
  }

  const pendingDocuments = documents.filter(d => d.status === "Pending")
  const verifiedDocuments = documents.filter(d => d.status === "Verified")
  const rejectedDocuments = documents.filter(d => d.status === "Rejected")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Document Verification</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Applicant Documents</CardTitle>
          <CardDescription>
            Review, verify, and manage all submitted documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending ({pendingDocuments.length})</TabsTrigger>
              <TabsTrigger value="verified">Verified ({verifiedDocuments.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedDocuments.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <DocumentVerificationTable documents={pendingDocuments} onStatusChange={handleStatusChange} />
            </TabsContent>
            <TabsContent value="verified">
              <DocumentVerificationTable documents={verifiedDocuments} onStatusChange={handleStatusChange} hideActions={true} />
            </TabsContent>
            <TabsContent value="rejected">
              <DocumentVerificationTable documents={rejectedDocuments} onStatusChange={handleStatusChange} hideActions={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
