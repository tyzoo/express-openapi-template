// src/utils/withMongoQuery.ts

import { Request, Response, NextFunction } from "express";
import { parseQueryParams } from "./parseQueryParams";
import { buildMongoQuery } from "./buildMongoQuery";

export function withMongoQuery(
	handler: (req: Request, res: Response, mongoQuery: any) => Promise<any>,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const queryParams = parseQueryParams(req.query);
			const mongoQuery = buildMongoQuery(queryParams);
			const result = await handler(req, res, mongoQuery);
			res.json(result);
		} catch (error) {
			next(error);
		}
	};
}
