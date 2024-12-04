/**
 * Calculates the diff between to numbers represented as strings.
 * @param a A number of type string.
 * @param b A number of type string.
 */
export function calculateDiff(a: string, b: string): number {
    return Number(a) - Number(b);
}