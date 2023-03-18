import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { getTag } from "../misc/getTag";

dotenv.config();

export async function onStart(app: express.Express, controllerCount: number) {
	try {
		const { MONGO_URI, REDIS_URI, PORT } = process.env;
		await mongoose.connect(MONGO_URI!);
		const mongoHost = new URL(MONGO_URI!).hostname;
		const redisHost = new URL(REDIS_URI!).hostname;
		const apiHost = process.env.APP_BASE_URL!;
		const appName = app.get("APP_NAME");
		app.listen(PORT, () => {
			console.log(getTag({
				controllerCount,
				mongoHost,
				redisHost,
				apiHost,
				appName,
			}));
		});
	} catch (error) {
		console.error(`Error! Failed to start: `, error);
		process.exit(1);
	}
}
