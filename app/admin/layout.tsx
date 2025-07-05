"use client";
import Sidebar from "@/components/sidebar";
import React from "react";
import { motion } from "framer-motion";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Panel Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold px-6 py-4 md:px-10 md:py-6"
      >
        Admin Panel
      </motion.div>

      {/* Sidebar + Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar: Hidden on mobile, shown on larger screens */}
        <div className=" md:block md:w-1/4 lg:w-1/6">
          <Sidebar />
        </div>

        {/* Main Content: Takes full width on mobile, reduced on larger screens */}
        <main className="w-full md:w-3/4 lg:w-5/6 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
