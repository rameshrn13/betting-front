"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Users, DollarSign, ChartLine, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const userGrowthData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 400 },
  { month: "Mar", users: 600 },
  { month: "Apr", users: 800 },
  { month: "May", users: 1000 },
  { month: "Jun", users: 1300 },
];

const bettingTrendsData = [
  { month: "Jan", bets: 500 },
  { month: "Feb", bets: 700 },
  { month: "Mar", bets: 900 },
  { month: "Apr", bets: 1200 },
  { month: "May", bets: 1500 },
  { month: "Jun", bets: 1800 },
];

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <h1 className="section-title">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Total Users", value: "1,245", icon: Users },
          { name: "Total Bets", value: "8,420", icon: ChartLine },
          { name: "Total Revenue", value: "$25,340", icon: DollarSign },
          {
            name: "Successful Transactions",
            value: "6,789",
            icon: CheckCircle,
          },
        ].map(({ name, value, icon: Icon }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="stat-card">
              <CardContent className="flex items-center gap-4">
                <Icon className="h-8 w-8" />
                <div>
                  <p className="text-muted-foreground text-sm">{name}</p>
                  <h3 className="text-2xl font-bold">{value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "User Engagements",
            data: userGrowthData,
            component: LineChart,
            key: "users",
            color: "#4F46E5",
          },
          {
            title: "Betting Trends",
            data: bettingTrendsData,
            component: BarChart,
            key: "bets",
            color: "#10B981",
          },
        ].map(
          ({ title, data, component: ChartComponent, key, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className="game-card">
                <CardContent>
                  <h2 className="text-xl font-bold mb-4">{title}</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <ChartComponent data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      {key === "users" ? (
                        <Line type="monotone" dataKey={key} stroke={color} />
                      ) : (
                        <Bar dataKey={key} fill={color} />
                      )}
                    </ChartComponent>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
