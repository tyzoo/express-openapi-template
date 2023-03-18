// src/utils/queryBuilder.ts

import { FilterQuery } from "mongoose";
import { QueryParams } from "./parseQueryParams";

interface MongoQuery {
	filters: FilterQuery<any>;
	options: {
		sort?: Record<string, 1 | -1>;
		limit?: number;
		skip?: number;
	};
}

export const buildMongoQuery = (queryParams: QueryParams): MongoQuery => {
	const filters: FilterQuery<any> = {};
	const options: MongoQuery["options"] = {};

	if (queryParams.filter) {
		Object.assign(filters, queryParams.filter);
	}

	if (queryParams.sort) {
		options.sort = queryParams.sort;
	}

	if (queryParams.limit) {
		options.limit = queryParams.limit;
	}

	if (queryParams.page && queryParams.limit) {
		options.skip = (queryParams.page - 1) * queryParams.limit;
	}

	return { filters, options };
};
