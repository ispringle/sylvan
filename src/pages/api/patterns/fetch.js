import fs from "fs";
import path from "path";

export default (req, res) => {
  const patternsDirectory = "assets/patterns/";
  const dir = path.resolve("./public/", patternsDirectory);

  const patternFiles = fs.readdirSync(dir);
  const patternFile =
    patternFiles[Math.floor(Math.random() * patternFiles.length)];
  const imagePath = path.resolve("./public/", patternsDirectory, patternFile);
  const imageBuffer = fs.readFileSync(imagePath);
  res.status(200).send(imageBuffer);
};
