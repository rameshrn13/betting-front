'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { History, Users } from 'lucide-react';

const colors = [
  { name: 'Red', class: 'bg-red-500', multiplier: 2 },
  { name: 'Green', class: 'bg-green-500', multiplier: 14 },
  { name: 'Blue', class: 'bg-blue-500', multiplier: 2 },
];

const recentResults = [
  { color: 'Red', hash: '8f3a...' },
  { color: 'Blue', hash: '2b7c...' },
  { color: 'Green', hash: '9e4d...' },
  { color: 'Red', hash: '6a1f...' },
];

const liveBets = [
  { user: 'Player123', amount: 500, color: 'Red' },
  { user: 'Winner88', amount: 1000, color: 'Blue' },
  { user: 'BetMaster', amount: 750, color: 'Green' },
];

export default function ColorGame() {
  const [betAmount, setBetAmount] = useState(100);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (!isRolling && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRolling(true);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else if (isRolling) {
      const timeout = setTimeout(() => {
        setIsRolling(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isRolling, timeLeft]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Display */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/50">
              <CardContent className="p-6">
                {/* Timer */}
                <div className="text-center mb-8">
                  {isRolling ? (
                    <div className="text-4xl font-bold text-primary animate-pulse">
                      Rolling...
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl font-medium">Next Roll In</div>
                      <div className="text-4xl font-bold">{timeLeft}s</div>
                    </div>
                  )}
                </div>

                {/* Color Buttons */}
                <div className="grid grid-cols-3 gap-4">
                  {colors.map((color) => (
                    <Button
                      key={color.name}
                      className={`h-32 ${color.class} hover:opacity-90 transition-opacity ${
                        selectedColor === color.name ? 'ring-4 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                      disabled={isRolling}
                    >
                      <div className="text-white text-center">
                        <div className="text-xl font-bold">{color.name}</div>
                        <div className="text-sm">{color.multiplier}x</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Betting Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Bet Amount</label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(Number(e.target.value))}
                          min={10}
                          max={10000}
                        />
                        <Button variant="outline" onClick={() => setBetAmount(betAmount * 2)}>
                          2x
                        </Button>
                        <Button variant="outline" onClick={() => setBetAmount(Math.max(10, betAmount / 2))}>
                          ½
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Potential Win</label>
                      <div className="h-10 flex items-center mt-2">
                        <span className="text-xl font-bold">
                          ₹
                          {selectedColor
                            ? (
                                betAmount *
                                colors.find((c) => c.name === selectedColor)!.multiplier
                              ).toFixed(2)
                            : '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedColor || isRolling}
                  >
                    Place Bet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Bets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Live Bets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveBets.map((bet, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{bet.user}</p>
                        <p className="text-sm text-muted-foreground">₹{bet.amount}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full ${
                          colors.find((c) => c.name === bet.color)?.class
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div
                        className={`w-6 h-6 rounded-full ${
                          colors.find((c) => c.name === result.color)?.class
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">{result.hash}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}