"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Progress } from "./progress";

interface SlotsCounterProps {
     maxSlots: number;
}

export function SlotsCounter({ maxSlots }: SlotsCounterProps) {
     const [currentSlots, setCurrentSlots] = useState(0);

     useEffect(() => {
          const fetchSlotCount = async () => {
               try {
                    const response = await fetch("/api/awareness-slots");
                    if (!response.ok)
                         throw new Error("Failed to fetch slot count");
                    const data = await response.json();
                    setCurrentSlots(data.count);
               } catch (error) {
                    console.error("Error fetching slot count:", error);
                    setCurrentSlots(0);
               }
          };

          fetchSlotCount();
          const interval = setInterval(fetchSlotCount, 30000);
          return () => clearInterval(interval);
     }, []);

     const remainingSlots = maxSlots - currentSlots;
     const progressPercentage = (currentSlots / maxSlots) * 100;

     return (
          <Card className="mb-6 border-0 bg-white/80 shadow-lg backdrop-blur-sm">
               <CardContent className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                              <UsersIcon className="h-5 w-5 text-green-600" />
                              <span className="font-semibold text-primary">
                                   Available Spots
                              </span>
                         </div>
                         <span className="text-2xl font-bold text-green-600">
                              {remainingSlots > 0
                                   ? remainingSlots
                                   : "Unlimited Leads"}
                         </span>
                    </div>
                    <Progress value={progressPercentage} className="mb-2 h-2" />
                    <p className="text-sm text-primary">
                         {currentSlots} of {maxSlots} spots filled
                    </p>
               </CardContent>
          </Card>
     );
}
