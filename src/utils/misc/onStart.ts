import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { readDir } from "./readDir";

dotenv.config();

export async function onStart(app: express.Express) {
  try {
    const { MONGO_URI, PORT } = process.env;
    await mongoose.connect(MONGO_URI!);
    const controllers = await readDir(path.join(__dirname, "..", "..", "controllers"), [".js",".ts"]);
    app.listen(PORT, () => {
      const target = `http://localhost:${PORT}`;
      const messageLines = [
        ``,
        `           Express OpenAPI Server`,
        ``,
        `      ©2023 @tyzoo https://github.com/tyzoo`,
        ``,
        `   ✅ Loaded ${controllers.length} API Controllers`,
        `   📀 Connected to MongoDB `,
        `   📀 Connected to Redis `,
        `   🚀 Server running at: ${target}`,
        ``,
      ];
      const longest = [...messageLines].sort((a, b) => b.length - a.length)[0].length;
      const extraPad = Math.max(longest - 47, 0);
      const border = '*'.repeat(52 + extraPad);
      const message = messageLines.map(line => '     * ' + line.padEnd(50 + extraPad) + ' *').join('\n');
      const borderAndMessage = [
        '\n\n     *' + border + '*',
        message,
        '     *' + border + '*\n\n',
      ].join('\n');
      console.log(chalk.hex('#ffffff')(borderAndMessage));
    });
  } catch (error) {
    console.error(`Error! Failed to start: `, error);
    process.exit(1);
  }
}