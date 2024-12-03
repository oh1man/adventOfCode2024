
/**
 * Reads a text and turns it into a string.
 * @param filePath The path to the file.
 */
export async function readFileToString(filePath: string) {
    return await Deno.readTextFile(filePath);
}