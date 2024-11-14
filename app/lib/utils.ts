import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isStoryblokPreview = (request: Request): boolean => {
  return process.env.NODE_ENV !== "production" || request.url.includes("_storyblok=");
}

export const extractDimensions = (url: string): { width: number, height: number } => {
  return {
    width: url.split('/')[5].split('x')[0] as unknown as number,
    height: url.split('/')[5].split('x')[1] as unknown as number,
  }
}