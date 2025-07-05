"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Pencil, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Report {
  id: string;
  user: string;
  type: string;
  status: "Pending" | "In Progress" | "Resolved";
  date: string;
  description: string;
}

const reportsData: Report[] = [
  {
    id: "RPT-001",
    user: "John Doe",
    type: "Bug",
    status: "Pending",
    date: "2024-02-25",
    description:
      "The submit button does not respond after clicking. Users are unable to complete their actions, causing frustration.",
  },
  {
    id: "RPT-002",
    user: "Jane Smith",
    type: "Payment Issue",
    status: "In Progress",
    date: "2024-02-24",
    description:
      "User attempted to make a payment but was charged twice. Requires investigation and refund process initiation.",
  },
  {
    id: "RPT-003",
    user: "Alice Brown",
    type: "UI Issue",
    status: "Resolved",
    date: "2024-02-23",
    description:
      "The navigation bar does not collapse on mobile screens, making it hard to use the site on smaller devices.",
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(reportsData);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [emailSentStatus, setEmailSentStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const handleEditClick = (report: Report) => {
    setSelectedReport(report);
  };

  const handleSendEmail = (id: string) => {
    setEmailSentStatus((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setEmailSentStatus((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((report) => report.status === filterStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 w-full mx-auto space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">📊 User Reports</CardTitle>
          <p className="text-gray-500 text-sm">
            Manage and resolve user reports.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="text-gray-600 text-sm">Filter by Status:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.user}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === "Resolved" ? "secondary" : "default"
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(report)}
                      >
                        <Pencil className="w-4 h-4 mr-1" /> View
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          emailSentStatus[report.id] ? "secondary" : "default"
                        }
                        onClick={() => handleSendEmail(report.id)}
                        disabled={emailSentStatus[report.id]}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        {emailSentStatus[report.id]
                          ? "Email Sent ✅"
                          : "Send Email"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedReport && (
        <Dialog open={true} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Input value={selectedReport.user} disabled />
              <Input value={selectedReport.type} disabled />
              <p className="text-gray-800 border p-3 rounded-md">
                {selectedReport.description}
              </p>
            </motion.div>
            <DialogFooter>
              <Button onClick={() => setSelectedReport(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
