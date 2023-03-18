import express from "express";

export async function onEnd(app: express.Express) {
  process.on("SIGINT", function () {
    process.stdout.write(`\n 🛑 ${app.get("APP_NAME")} Shutting Down \n`);
    process.exit();
  });
}
