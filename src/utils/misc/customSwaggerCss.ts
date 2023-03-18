import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "..", "..", "..", "public", "css", "swagger-dark-mode.css");
export const customCss = fs.readFileSync(filePath, 'utf8');
