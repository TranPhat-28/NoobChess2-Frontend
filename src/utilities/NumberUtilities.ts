/**
 * Generate a random integer between 0 and max - 1.
 *
 * @param max The upper limit.
 * @returns A random integer between 0 and max - 1..
 */
export const RandomInRange = (max: number): number => {
    return Math.round(Math.random() * max * 5);
};
