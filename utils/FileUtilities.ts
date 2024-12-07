
/**
 * Reads a text and turns it into a string.
 * @param filePath The path to the file.
 */
export async function readFileToString(filePath: string) {
    return await Deno.readTextFile(filePath);
}

/**
 * Takes a long string and turns it into a matrix of characters.
 * @param stringFile The input file defined as a long string.
 */
export function createMatrix(stringFile: string): string[][] {
    const listOfStrings = stringFile.trim().split("\n");
    const inputMatrix2D: string[][] = [];
    listOfStrings.forEach((stringList) => {
        inputMatrix2D.push(stringList.trim().split(""))
    })
    return inputMatrix2D;
}