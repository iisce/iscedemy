import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

export function FlipWordsDemo() {
  const words = ["Learn to code.", "Build a portfolio.", "Get hired.", "Stay ahead!"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className="xl:text-5xl md:text-3xl md:text-wrap text-xl font-bold text-neutral-900 dark:text-neutral-400">
        Get Ready to 
        <FlipWords words={words} /> <br />
        Kick-start your tech career today with PalmTechnIQ
      </div>
    </div>
  );
}
