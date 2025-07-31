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
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
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
     if (!inputString || typeof inputString !== "string") {
          return "";
     }
     return inputString.replace(/[A-Z]/g, (match, index) => {
          return index === 0 ? match : ` ${match}`;
     });
}
export function toSlug(str: string): string {
     return str
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
}

/**
 * Formats a string representing class days by applying specific transformations:
 * - Trims leading and trailing whitespace.
 * - Replaces occurrences of "and" (case-insensitive) surrounded by optional spaces with "--".
 * - Removes all remaining whitespace.
 *
 * @param days - The input string representing class days.
 * @returns The formatted string with the specified transformations applied.
 */
export function formatClassDays(days: string): string {
     return days
          .trim()
          .replace(/\s*and\s*/gi, "--")
          .replace(/\s+/g, "");
}

/**
 * Generates a URL for a course based on its ID or title.
 *
 * @param course - An optional object containing the course details.
 * @param course.id - The unique identifier of the course.
 * @param course.title - The title of the course.
 * @param preferTitle - A boolean indicating whether to prioritize the course title in the URL.
 *                       Defaults to `false`.
 * @returns The generated course URL. If no course is provided, returns `/courses`.
 *          If `preferTitle` is `true` and the course has a title, returns `/courses/{title}`.
 *          Otherwise, returns `/courses/{id}` if the course has an ID, or `/courses` as a fallback.
 */
export function courseUrl(
     course?: { id?: string; title?: string },
     preferTitle = false,
) {
     if (!course) return "/courses";
     if (preferTitle && course.title) {
          return `/courses/${course.title}`;
     }
     if (course.id) {
          return `/courses/${course.id}`;
     }
     return "/courses";
}
/**
 * Formats a given Date object into a compact ISO 8601 string.
 *
 * The resulting string removes dashes, colons, and milliseconds,
 * and appends a "Z" to indicate UTC time.
 *
 * @param date - The Date object to format.
 * @returns A formatted string representing the date in UTC.
 */
export const formatDate = (date: Date) => {
     return (
          date
               .toISOString()
               .replace(/-|:|\.\d{3}/g, "")
               .split(".")[0] + "Z"
     );
};

/**
 * Extracts the video ID from a given YouTube URL.
 *
 * This function supports both standard YouTube URLs (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
 * and shortened YouTube URLs (e.g., `https://youtu.be/VIDEO_ID`), as well as embedded video URLs
 * (e.g., `https://www.youtube.com/embed/VIDEO_ID`).
 *
 * @param url - The YouTube URL from which to extract the video ID.
 * @returns The extracted video ID as a string, or `null` if the URL is invalid or the video ID cannot be determined.
 */
export const extractVideoId = (url: string) => {
     try {
          const urlObj = new URL(url);
          if (urlObj.hostname.includes("youtube.com")) {
               if (urlObj.pathname.includes("/embed/")) {
                    return urlObj.pathname.split("/embed/")[1];
               }
               return urlObj.searchParams.get("v");
          } else if (urlObj.hostname.includes("youtu.be")) {
               return urlObj.pathname.split("/")[1];
          }
     } catch (error) {
          console.error(`Error parsing video URL: ${url}`, error);
     }
     return null;
};

export const getNameFromEmail = (email: string): string => {
     const [localPart] = email.split("@");
     const segments = localPart.split(/[\.\_\-\d]/).filter(Boolean); // split on common separators and digits

     const blacklist = ["info", "support", "contact", "admin", "sales"];

     // Filter out known blacklisted segments
     const nameSegments = segments.filter(
          (segment) => !blacklist.includes(segment.toLowerCase()),
     );

     if (nameSegments.length === 0) {
          return "SuperStar";
     }

     // Capitalize each segment
     const capitalizedName = nameSegments
          .map(
               (name) =>
                    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          )
          .join(" ");

     return capitalizedName.trim();
};
