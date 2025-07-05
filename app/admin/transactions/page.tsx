"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion Import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Transaction = {
  id: string;
  user: string;
  amount: string;
  method: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

const transactions: Transaction[] = [
  {
    id: "TXN12345",
    user: "John Doe",
    amount: "$120.00",
    method: "Credit Card",
    status: "Completed",
    date: "2024-02-25",
  },
  {
    id: "TXN67890",
    user: "Jane Smith",
    amount: "$45.50",
    method: "PayPal",
    status: "Pending",
    date: "2024-02-24",
  },
  {
    id: "TXN11121",
    user: "Alice Brown",
    amount: "$320.75",
    method: "Bank Transfer",
    status: "Failed",
    date: "2024-02-23",
  },
  {
    id: "TXN11122",
    user: "Alice Brown",
    amount: "$320.75",
    method: "Bank Transfer",
    status: "Failed",
    date: "2024-02-23",
  },
  {
    id: "TXN11123",
    user: "Alice Brown",
    amount: "$320.75",
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-02-23",
  },
];

// Map status to badge variants
const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "default";
    case "Pending":
      return "secondary";
    case "Failed":
      return "destructive";
    default:
      return "outline";
  }
};

export default function TransactionsPage() {
  const [open, setOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [txnStatuses, setTxnStatuses] = useState<
    Record<string, "Completed" | "Pending" | "Failed">
  >(transactions.reduce((acc, txn) => ({ ...acc, [txn.id]: txn.status }), {}));

  const handleView = (txn: Transaction) => {
    setSelectedTxn(txn);
    setOpen(true);
  };

  const handleStatusChange = (
    id: string,
    newStatus: "Completed" | "Pending" | "Failed"
  ) => {
    setTxnStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  return (
    <motion.div
      className="p-6 w-full mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{txn.method}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={getBadgeVariant(txnStatuses[txn.id])}>
                        {txnStatuses[txn.id]}
                      </Badge>
                      <Select
                        onValueChange={(newStatus: any) =>
                          handleStatusChange(txn.id, newStatus)
                        }
                        value={txnStatuses[txn.id]}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(txn)}
                    >
                      View
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTxn && (
            <motion.div
              className="space-y-2 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p>
                <strong>ID:</strong> {selectedTxn.id}
              </p>
              <p>
                <strong>User:</strong> {selectedTxn.user}
              </p>
              <p>
                <strong>Amount:</strong> {selectedTxn.amount}
              </p>
              <p>
                <strong>Method:</strong> {selectedTxn.method}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge variant={getBadgeVariant(txnStatuses[selectedTxn.id])}>
                  {txnStatuses[selectedTxn.id]}
                </Badge>
              </p>
              <p>
                <strong>Date:</strong> {selectedTxn.date}
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
