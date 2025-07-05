"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CircleDollarSign,
  Gamepad2,
  TrendingUp,
  Users,
  Shield,
  Gift,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const games = [
  {
    id: "aviator",
    name: "Aviator",
    description:
      "Watch the multiplier grow and cash out before the plane flies away!",
    icon: TrendingUp,
    minBet: "₹10",
    maxWin: "100x",
    players: 1250,
  },
  {
    id: "color",
    name: "Color Game",
    description: "Bet on Red, Green, or Blue and multiply your winnings!",
    icon: Users,
    minBet: "₹20",
    maxWin: "14x",
    players: 890,
  },
];

const winners = [
  { name: "Alex S.", game: "Aviator", amount: "₹15,000", time: "2m ago" },
  { name: "Maria G.", game: "Color Game", amount: "₹12,500", time: "5m ago" },
  { name: "John D.", game: "Aviator", amount: "₹10,000", time: "8m ago" },
];

const features = [
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Industry-leading security measures to protect your funds",
  },
  {
    icon: Gift,
    title: "Instant Rewards",
    description: "Withdraw your winnings instantly to your account",
  },
  {
    icon: MessageSquare,
    title: "24/7 Support",
    description: "Our team is always here to help you",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <motion.div initial="hidden" animate="visible" className="min-h-screen">
      {/* Hero Section */}
      <motion.section variants={fadeIn} className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Bet, Play & Win Big!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Experience the thrill of next-generation betting with instant
            payouts and provably fair games.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/signup">
              <Button size="lg" className="cta-button">
                <CircleDollarSign className="w-5 h-5 mr-2" /> Start Playing
              </Button>
            </Link>
            <Link href="/games">
              <Button size="lg" variant="outline" className="outline-button">
                <Gamepad2 className="w-5 h-5 mr-2" /> Browse Games
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Popular Games */}
      <motion.section variants={fadeIn} className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="section-title text-center">Popular Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {games.map((game) => (
              <Link key={game.id} href={`/game/${game.id}`}>
                <Card className="game-card flex flex-col items-center p-6 text-center">
                  <game.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {game.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Live Winners */}
      <motion.section variants={fadeIn} className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="section-title text-center">Live Winners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {winners.map((winner, index) => (
              <div
                key={index}
                className="winner-card flex items-center space-x-4 p-z shadow rounded-lg"
              >
                <div className="avatar w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full">
                  {winner.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{winner.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Won {winner.amount} on {winner.game}
                  </p>
                  <p className="text-xs text-muted-foreground">{winner.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section variants={fadeIn} className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="section-title text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="stat-card flex flex-col items-center p-6 text-center"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section variants={fadeIn} className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Winning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of players and start winning today
          </p>
          <Link href="/signup">
            <Button size="lg" className="cta-button">
              Create Account
            </Button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
