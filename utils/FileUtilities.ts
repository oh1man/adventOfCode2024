import {superLog} from "./CommentUtilities.ts";

/**
 * Checks if a file path exists.
 * @param path The path to the file.
 */
export async function checkIfFileExists(filePath: string) {
    let bunFile = Bun.file(filePath);
    let fileExists = await bunFile.exists();
    if (fileExists) {
        superLog("The file exist!")
    } else {
        console.log("The file does not exist!");
        console.log('Current Path:', process.cwd());
    }
}

/**
 * Reads a text and turns it into a string.
 * @param filePath The path to the file.
 */
export async function readFileToString(filePath: string) {
    checkIfFileExists(filePath);
    let bunFile = Bun.file(filePath);
    return await bunFile.text();
}