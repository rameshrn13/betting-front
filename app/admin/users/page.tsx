"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit, Trash, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Define User Type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  totalBets: number;
  createdAt: string;
  playtime: string;
  reports: number;
}

// Mock Data
const demoUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    totalBets: 45,
    createdAt: "2023-05-10",
    playtime: "250h",
    reports: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    totalBets: 12,
    createdAt: "2023-08-22",
    playtime: "120h",
    reports: 0,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Editor",
    totalBets: 33,
    createdAt: "2022-11-15",
    playtime: "300h",
    reports: 1,
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    role: "User",
    totalBets: 27,
    createdAt: "2023-02-03",
    playtime: "180h",
    reports: 2,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(demoUsers);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveUser = () => {
    if (!selectedUser) return;

    if (isAdding) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...selectedUser, id: prevUsers.length + 1 },
      ]);
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
    }

    setSelectedUser(null);
    setIsAdding(false);
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button
              className="button-effect flex gap-2"
              onClick={() => {
                setSelectedUser({
                  id: 0,
                  name: "",
                  email: "",
                  role: "",
                  totalBets: 0,
                  createdAt: "",
                  playtime: "",
                  reports: 0,
                });
                setIsAdding(true);
              }}
            >
              <Plus className="w-4 h-4" /> Add User
            </Button>
          </div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Total Bets</TableHead>
                  <TableHead>Login at</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.totalBets}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.playtime}</TableCell>
                    <TableCell>{user.reports}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsAdding(false);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setUsers((prev) =>
                              prev.filter((u) => u.id !== user.id)
                            )
                          }
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </CardContent>
      </Card>

      {/* User Edit/Add Modal */}
      <Dialog
        open={!!selectedUser}
        onOpenChange={() => {
          setSelectedUser(null);
          setIsAdding(false);
        }}
      >
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle>{isAdding ? "Add New User" : "Edit User"}</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Input
                placeholder="Name"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
              />
              <Input
                placeholder="Email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, email: e.target.value } : null
                  )
                }
              />
              <Input
                placeholder="Role"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, role: e.target.value } : null
                  )
                }
              />
              <Input
                type="number"
                placeholder="Total Bets"
                value={selectedUser.totalBets}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, totalBets: Number(e.target.value) } : null
                  )
                }
              />
              <Input
                placeholder="Account Created (YYYY-MM-DD)"
                value={selectedUser.createdAt}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, createdAt: e.target.value } : null
                  )
                }
              />
              <Input
                placeholder="Playtime"
                value={selectedUser.playtime}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, playtime: e.target.value } : null
                  )
                }
              />
              <Input
                type="number"
                placeholder="Reports"
                value={selectedUser.reports}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, reports: Number(e.target.value) } : null
                  )
                }
              />
            </motion.div>
          )}
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedUser(null);
                setIsAdding(false);
              }}
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSaveUser}>
              <Plus className="w-4 h-4 mr-2" /> {isAdding ? "Add" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
