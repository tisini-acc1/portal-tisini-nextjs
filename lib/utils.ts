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

// export const getEvent = (arry: Stats, eventId: string) => {
//   const value = Object.values(arry).filter((item) => item.event_id === eventId);

//   return parseInt(value[0].total);
// };

// export const getSubEvent = (
//   array: Stats,
//   eventId: string,
//   subEventId: string
// ) => {
//   const event = Object.values(array).filter(
//     (item) => item.event_id === eventId
//   );

//   const stat = event[0]["sub-event"].filter(
//     (item) => item.subeventid === subEventId
//   );

//   return parseInt(stat[0].totalsubevent);
// };

export function calculatePossession() {
  return {};
}
