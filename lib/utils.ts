import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateYearsOld(dateString: string): number {
  // Convert the given date string into a Date object
  const givenDate = new Date(dateString);
  // Get today's date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate.getTime() - givenDate.getTime();

  // Convert milliseconds to years (accounting for leap years using 365.25 days per year)
  const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

  // Return the difference in full years (rounded down)
  return Math.floor(yearsDifference);
}
