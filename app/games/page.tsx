"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Dice1 as Dice,
  Car as Cards,
  Gamepad2,
  ShieldCheck,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { selectCurrentUserInfo } from "@/store/reducers/userReducer";
import { useSelector } from "react-redux";

const games = [
  {
    id: "aviator",
    name: "Aviator",
    description:
      "A high-risk, high-reward multiplier game where timing is everything! Cash out before the plane flies away.",
    icon: TrendingUp,
    players: 1250,
    maxWin: "100x",
    difficulty: "High",
    strategy:
      "Watch previous rounds to estimate multipliers and exit at the right moment.",
  },
  {
    id: "color",
    name: "Color Game",
    description:
      "Simple and fun! Bet on Red, Green, or Blue to multiply your winnings based on probability.",
    icon: Users,
    players: 890,
    maxWin: "3x",
    difficulty: "Low",
    strategy:
      "Analyze past trends and place strategic bets based on probability distribution.",
  },
  {
    id: "dice",
    name: "Dice Roll",
    description:
      "Predict the outcome of a six-sided dice roll. Higher risks mean higher rewards!",
    icon: Dice,
    players: 645,
    maxWin: "50x",
    difficulty: "Medium",
    strategy:
      "Use probability analysis to balance risk and reward on higher multiplier bets.",
  },
  {
    id: "blackjack",
    name: "Blackjack",
    description:
      "Classic 21-point card game. Play against the dealer and aim for the perfect hand!",
    icon: Cards,
    players: 432,
    maxWin: "3x",
    difficulty: "Medium",
    strategy:
      "Use basic Blackjack strategy (hit, stand, double down) for the best odds against the dealer.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "We prioritize security with fair gameplay and encrypted transactions.",
  },
  {
    icon: Clock,
    title: "Instant Games",
    description:
      "No waiting! Start playing instantly with zero lag or interruptions.",
  },
  {
    icon: DollarSign,
    title: "Fast Payouts",
    description: "Withdraw your winnings quickly with our hassle-free process.",
  },
];

export default function GamesPage() {
  const user = useSelector(selectCurrentUserInfo); // Use this hook to get the user
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-12 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* 🎮 Page Title */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Gamepad2 className="w-8 h-8" /> Available Games
              </h1>
              <p className="text-muted-foreground mt-1">
                Explore our diverse selection of games, each with its own unique
                challenges and rewards.
              </p>
            </div>
          </div>

          {/* 🎲 Game Cards */}
          <motion.div
            className="grid grid-cols-1 gap-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {games.map((game) => (
              <Link key={game.id} href={user ? `/game/${game.id}` : "/login"}>
                <Card className="hover:bg-accent/50 transition-all cursor-pointer flex flex-col w-full lg:max-w-full md:flex-row items-center gap-6 p-4 md:p-6 md:max-w-3xl md:mx-auto">
                  <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center">
                    <game.icon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl">{game.name}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Live Players
                        </p>
                        <p className="font-medium">{game.players}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Max Win</p>
                        <p className="font-medium">{game.maxWin}</p>
                      </div>
                    </CardContent>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Strategy:</strong> {game.strategy}
                    </p>
                  </div>
                  <Button className="w-full md:w-auto">Play Now</Button>
                </Card>
              </Link>
            ))}
          </motion.div>

          {/* 💎 Why Choose Us? Section */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold">Why Choose Us?</h2>
            <p className="text-muted-foreground">
              Experience the best online gaming platform with these benefits:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="p-6 flex flex-col items-center text-center"
                >
                  <benefit.icon className="w-10 h-10 text-primary" />
                  <CardTitle className="mt-4">{benefit.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {benefit.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
