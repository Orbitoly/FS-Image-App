/**
 * Formats a number to a compact representation (e.g., 1000 -> 1k, 1000000 -> 1m)
 * with consistent width to prevent UI jumping when numbers change
 * @param count The number to format
 * @returns Formatted string representation of the number
 */
export function formatCount(count: number): string {
  if (count < 1000) {
    // For small numbers, just return the number as a string
    return count.toString();
  } else if (count < 1000000) {
    // For thousands, use 'k' suffix (e.g., 1.2k)
    return `${(count / 1000).toFixed(count % 1000 < 100 ? 0 : 1)}K`;
  } else {
    // For millions and above, use 'm' suffix (e.g., 1.2m)
    return `${(count / 1000000).toFixed(count % 1000000 < 100000 ? 0 : 1)}M`;
  }
}
