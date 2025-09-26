
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DocumentVerificationTable } from "@/components/admin/document-verification-table"
import { mockDocuments } from "@/lib/data"

export default function DocumentVerificationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Document Verification</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Documents</CardTitle>
          <CardDescription>
            Review and verify applicant documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <DocumentVerificationTable documents={mockDocuments} />
        </CardContent>
      </Card>
    </div>
  );
}
