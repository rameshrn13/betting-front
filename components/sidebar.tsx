"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Home,
  Users,
  DollarSign,
  BarChart,
  Settings,
  LogOut,
  MailWarning,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Bets", href: "/admin/bets", icon: DollarSign },
  { name: "Transactions", href: "/admin/transactions", icon: BarChart },
  { name: "Reports", href: "/admin/reports", icon: MailWarning },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around p-3 z-50">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 transition-all ${
              pathname === href ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{name}</span>
          </Link>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex flex-col h-full w-full border-r border-border text-card-foreground p-6 justify-between"
      >
        {/* Navigation Links */}
        <nav className="space-y-4">
          {navItems.map(({ name, href, icon: Icon }) => (
            <motion.div
              key={href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={href}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                  pathname === href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 w-full p-3 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </motion.aside>
    </>
  );
}
