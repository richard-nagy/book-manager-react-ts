import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LogoSize } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Tests the provided string and returns true if the tested string is empty.
 * @param value The string we want to test.
 * @returns Returns true if the tested string is empty.
 */
export function isStringEmpty(value: string | undefined | null): boolean {
    if (typeof value !== "string") {
        return true;
    }

    const whitespaceRegex = /^\s*$/;
    return whitespaceRegex.test(value);
}

export async function attemptFetch<T>(
    fn: () => Promise<T>,
    maxRetries: number,
    delayMs: number,
): Promise<T> {
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            lastError = error;

            if (attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            } else {
                throw lastError;
            }
        }
    }

    throw new Error("Failed after all retries.");
}

export function getLogoSize(size: LogoSize) {
    switch (size) {
        case LogoSize.large:
            return 30;
        case LogoSize.small:
            return 20;
        default:
        case LogoSize.medium:
            return 24;
    }
}
