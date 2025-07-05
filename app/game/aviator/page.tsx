"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import Image from "next/image";
import backgroundImage from "@/components/img/Background.webp"; // Ensure the image is placed in the public folder
import planeImage from "@/components/img/plane.png"; // Ensure the image is placed in the public folder

export default function AviatorGame() {
  const [betAmount, setBetAmount] = useState(100);
  const [isFlying, setIsFlying] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [cashout, setCashout] = useState<any>(null);
  const planeRef = useRef(null);
  const trailRef = useRef(null);
  const multiplierRef = useRef(null);
  const readyRef = useRef(null);

  useEffect(() => {
    if (isFlying) {
      const stopAt = Math.random() * 3 + 2; // Ensuring it stops before reaching 5x
      gsap.to(planeRef.current, {
        x: "80vw",
        y: "-40vh",
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          setCurrentMultiplier((prev) => {
            if (prev >= stopAt) {
              handleStop();
              return 1;
            }
            return Math.min(prev + 0.05, 5);
          });
        },
        onComplete: () => setIsFlying(false),
      });

      gsap.to(trailRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(multiplierRef.current, { opacity: 1, duration: 0.5 });
      gsap.to(readyRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [isFlying]);

  const handleStop = () => {
    setIsFlying(false);
    setGameOver(true);
    gsap.killTweensOf(planeRef.current);
    gsap.to(trailRef.current, { opacity: 0, duration: 0.5 });
  };

  const handleBet = () => {
    if (!isFlying) {
      setIsFlying(true);
      setGameOver(false);
      setCurrentMultiplier(1);
      setCashout(null);

      // Reset position
      gsap.set(planeRef.current, { x: "0vw", y: "40vh" });
      gsap.set(trailRef.current, { opacity: 1 });
      gsap.set(multiplierRef.current, { opacity: 1 });
      gsap.set(readyRef.current, { opacity: 1 });
    }
  };

  const handleCashout = () => {
    if (isFlying) {
      setCashout(currentMultiplier);
      handleStop();
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center text-white relative">
      <Card className="w-full h-[600px] bg-gray-900 border border-gray-700 rounded-xl relative overflow-hidden shadow-lg z-10">
        <Image
          src={backgroundImage}
          alt="Game Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <CardContent className="p-6 h-full w-full flex flex-col items-center justify-center relative">
          <div className="absolute bottom-0 left-0 w-full h-full flex">
            <div className="w-10 border-r border-gray-600"></div>
            <div className="h-10 w-full border-t border-gray-600"></div>
          </div>

          {/* Flight Trail */}
          <div
            ref={trailRef}
            className="absolute left-0 bottom-0 w-32 h-2 bg-blue-400 opacity-0 transition-all"
          ></div>

          {/* Plane */}
          <div
            ref={planeRef}
            className="absolute left-0 bottom-0 transition-all w-16 h-16"
          >
            <Image src={planeImage} alt="Plane" width={64} height={64} />
          </div>

          {/* Multiplier Display */}
          <div
            ref={multiplierRef}
            className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold text-green-500 transition-all opacity-0"
          >
            {gameOver ? "Ready to Fly" : `${currentMultiplier.toFixed(1)}x`}
          </div>

          {/* Ready to Play Text */}
          <div
            ref={readyRef}
            className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-gray-300 transition-opacity opacity-100"
          >
            Ready to Play
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="bg-gray-800 border border-gray-700 rounded-xl w-full mt-6 shadow-lg z-10">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between text-lg">
            <span>Bet Amount: ₹{betAmount}</span>
            <div className="flex gap-3">
              <Button
                onClick={() => setBetAmount((prev) => Math.max(10, prev - 50))}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                - ₹50
              </Button>
              <Button
                onClick={() => setBetAmount((prev) => prev + 50)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                + ₹50
              </Button>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <Button
              onClick={handleBet}
              disabled={isFlying}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md"
            >
              {isFlying ? "Flying..." : "Place Bet"}
            </Button>
            <Button
              onClick={handleCashout}
              disabled={!isFlying}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold shadow-md"
            >
              Cashout
            </Button>
          </div>
          {cashout && (
            <div className="text-center text-xl font-semibold text-green-400">
              Cashout at {cashout.toFixed(2)}x
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
