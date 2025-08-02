import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Converts bytes to human readable format
 * @param bytes - Number of bytes
 * @returns Formatted string with appropriate unit (B, KB, MB, GB)
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

// Alias with the name you requested
export const functionSize = formatSize;

export const generateUUID = () => crypto.randomUUID();

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
