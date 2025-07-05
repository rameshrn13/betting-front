'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, TrendingUp, Users, Award, Gift } from 'lucide-react';
import Link from 'next/link';

const topWinners = [
  { name: 'Alex Smith', amount: 15000 },
  { name: 'Maria Garcia', amount: 12500 },
  { name: 'John Doe', amount: 10000 },
  { name: 'Sarah Wilson', amount: 8500 },
  { name: 'Mike Johnson', amount: 7000 },
];

const recentBets = [
  { game: 'Aviator', amount: 500, multiplier: '2.5x', result: 'win' },
  { game: 'Color Game', amount: 200, multiplier: '-', result: 'loss' },
  { game: 'Aviator', amount: 1000, multiplier: '1.8x', result: 'win' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Player!</h1>
            <p className="text-muted-foreground">Here's your betting overview</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              <CircleDollarSign className="w-5 h-5" />
              Deposit
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <TrendingUp className="w-5 h-5" />
              Withdraw
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹25,000</div>
              <p className="text-xs text-muted-foreground">+₹2,500 today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bets</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+23 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">64%</div>
              <p className="text-xs text-muted-foreground">+2% this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Earnings</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3,250</div>
              <p className="text-xs text-muted-foreground">+₹500 this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Games and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Access Games */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Access Games</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/game/aviator">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Aviator</h3>
                      <p className="text-sm text-muted-foreground">Multiplier Game</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/game/color">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Color Game</h3>
                      <p className="text-sm text-muted-foreground">Pick & Win</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Top Winners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topWinners.map((winner, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="font-medium">{winner.name}</span>
                    </div>
                    <span className="text-primary">₹{winner.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bets */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBets.map((bet, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {bet.game === 'Aviator' ? <TrendingUp className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{bet.game}</h4>
                      <p className="text-sm text-muted-foreground">Multiplier: {bet.multiplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{bet.amount}</p>
                    <p className={`text-sm ${bet.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                      {bet.result.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}