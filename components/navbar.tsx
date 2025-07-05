"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleDollarSign,
  Gamepad2,
  Wallet,
  User,
  Gift,
  HelpCircle,
  Shield,
  MailWarning,
  Menu,
  X,
} from "lucide-react";
import ThemeSwitcher from "./themeSwitcher";
import { selectCurrentUserInfo } from "@/store/reducers/userReducer";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Games", href: "/games", icon: Gamepad2, requiresAuth: false },
  { name: "Wallet", href: "/wallet", icon: Wallet, requiresAuth: true },
  { name: "Profile", href: "/profile", icon: User, requiresAuth: true },
  { name: "Referral", href: "/referral", icon: Gift, requiresAuth: true },
  { name: "Support", href: "/support", icon: HelpCircle, requiresAuth: false },
  { name: "Fair Play", href: "/fair-play", icon: Shield, requiresAuth: false },
  { name: "Reports", href: "/reports", icon: MailWarning, requiresAuth: false },
];

export function Navbar() {
  const pathname = usePathname();
  const user = useSelector(selectCurrentUserInfo); // Use this hook to get the user
  const [isOpen, setIsOpen] = useState(false);
  const filteredNavigation = navigation.filter(
    (item) => !item.requiresAuth || (item.requiresAuth && user)
  );
  return (
    <>
      <header className="sticky top-0 z-50 w-full flex justify-center  border-b shadow-md">
        <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary">
            <CircleDollarSign className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">NexusBet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {filteredNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:text-blue-500 ${
                  pathname === item.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Login
                </Button>
              </Link>
            )}
            <div className="">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-16 left-0 w-full bg-background shadow-lg border-t"
            >
              <div className="flex flex-col space-y-3 p-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 text-sm font-medium py-2 hover:text-blue-500 ${
                      pathname === item.href
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4">
                  {!user && (
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full text-blue-600 border-blue-600"
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                  <div className="fixed bottom-5 right-2">
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
