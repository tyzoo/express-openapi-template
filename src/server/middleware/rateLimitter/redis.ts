import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config();

const redis = new Redis(process.env.REDIS_URI!);

export default redis;
