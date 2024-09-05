import { Review } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
}

export function generateSlug(title: string) {
     return title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");
}

export function calculateAverageRating(reviews: Review[]): number {
     if (reviews.length === 0) {
          return 0;
     }

     const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
     );

     const averageRating = totalRating / reviews.length;

     return averageRating;
}

export const formatToNaira = (amount: number): string => {
     if (typeof amount !== "number") return amount;
     return amount.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
     });
};

export function getInitials(name: string): string {
     const words = name.trim().split(" ");

     if (words.length >= 2) {
          const firstInitial = words[0].charAt(0);
          const secondInitial = words[1].charAt(0);
          return `${firstInitial}${secondInitial}`;
     }

     return words[0].charAt(0);
}

export function capitalizeWords(inputString: string | undefined): string {
     if(!inputString || typeof inputString !== 'string') {
          return '';
     }
     return inputString.replace(/[A-Z]/g, (match, index) => {
          return index === 0 ? match : ` ${match}`;
     });
}
