"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `We're dedicated to providing the best technical education for our students, preparing them for success in the digital age. Our innovative approach, experienced instructors, and hands-on learning opportunities make our institute the perfect place to launch your career in tech.`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
