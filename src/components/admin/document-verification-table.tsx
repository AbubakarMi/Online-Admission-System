
"use client"

import * as React from "react"
import Link from "next/link"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export type Document = {
  id: string
  applicantName: string
  applicationId: string
  documentType: "Academic Transcript" | "Recommendation Letter" | "Passport"
  submittedDate: string
  status: "Pending" | "Verified" | "Rejected"
}

const getStatusBadgeVariant = (status: Document["status"]) => {
  switch (status) {
    case "Verified":
      return "default"
    case "Pending":
      return "secondary"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}

export function DocumentVerificationTable({ documents: initialDocuments }: { documents: Document[] }) {
  const { toast } = useToast()
  const [documents, setDocuments] = React.useState(initialDocuments)
  
  const handleStatusChange = (docId: string, newStatus: Document["status"]) => {
    setDocuments(currentDocs => 
      currentDocs.map(doc => 
        doc.id === docId ? { ...doc, status: newStatus } : doc
      )
    )
    const doc = documents.find(d => d.id === docId);
    toast({
        title: `Document ${newStatus}`,
        description: `${doc?.applicantName}'s ${doc?.documentType} has been marked as ${newStatus}.`
    })
  }

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "applicantName",
      header: "Applicant",
    },
    {
      accessorKey: "documentType",
      header: "Document Type",
    },
    {
      accessorKey: "submittedDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Document["status"]
        return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
      },
       filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const document = row.original
        const isActionable = document.status === "Pending"

        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/applications/${document.applicationId}`}>
                    <Eye className="mr-2 h-4 w-4" /> View
                </Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-accent hover:bg-accent/90"
              onClick={() => handleStatusChange(document.id, "Verified")}
              disabled={!isActionable}
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Verify
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleStatusChange(document.id, "Rejected")}
              disabled={!isActionable}
            >
              <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
          </div>
        )
      },
    },
  ]


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: documents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter by applicant name..."
          value={
            (table.getColumn("applicantName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("applicantName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("status")?.setFilterValue(undefined)
            } else {
              table.getColumn("status")?.setFilterValue(value)
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Verified">Verified</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
