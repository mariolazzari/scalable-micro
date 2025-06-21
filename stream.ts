import fs from "fs";
import { Transform } from "stream";

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();
    callback(null, upperCaseChunk);
  },
});

const inputFilePath = "input.txt";
const outputFilePath = "output.txt";
const inputStream = fs.createReadStream(inputFilePath);
const outputStream = fs.createWriteStream(outputFilePath);
inputStream
  .pipe(upperCaseTransform)
  .pipe(outputStream)
  .on("finish", () => {
    console.log("File transformation complete.");
  })
  .on("error", error => {
    console.error("Error during file transformation:", error);
  });
