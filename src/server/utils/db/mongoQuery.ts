export const operatorPermissions = {
	comparisonOperators: {
		$eq: true,
		$gt: true,
		$gte: true,
		$lt: true,
		$lte: true,
		$ne: true,
		$in: true,
		$nin: true,
	},
	logicalOperators: {
		$and: true,
		$or: true,
		$not: true,
		$nor: true,
	},
	elementOperators: {
		$exists: true,
		$type: true,
	},
	evaluationOperators: {
		$expr: false,
		$jsonSchema: false,
		$mod: false,
		$regex: false,
		$text: false,
		$where: false,
	},
	geospatialOperators: {
		$geoIntersects: false,
		$geoWithin: false,
		$near: false,
		$nearSphere: false,
	},
	arrayOperators: {
		$all: true,
		$elemMatch: true,
		$size: true,
	},
};

function isOperatorValid(operator: string): boolean {
	for (const category in operatorPermissions) {
		if ((operatorPermissions as any)[category][operator]) {
			return true;
		}
	}
	return false;
}

export interface FilterQueryParams {
	[key: string]: any;
	sort?: string;
	limit?: number;
	page?: number;
}

function unflattenObject(flatObject: any) {
	const result: any = {};
	for (const [key, value] of Object.entries(flatObject)) {
		const parts = key.split(".");
		let currentObj = result;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (!(part in currentObj)) {
				currentObj[part] = {};
			}
			currentObj = currentObj[part];
		}
		currentObj[parts[parts.length - 1]] = value;
	}
	return result;
}

function parseFilter(queryParams: FilterQueryParams) {
	let filter: any = {};
	const logicalOperators = ["$and", "$not", "$nor", "$or"];

	for (const key in queryParams) {
		if (key === "filters") {
			const filters = queryParams[key];
			for (const operator in filters) {
				if (logicalOperators.includes(operator)) {
					filter[operator] = Array.isArray(filters[operator])
						? filters[operator].map((item: string) => JSON.parse(item))
						: JSON.parse(filters[operator]).map((o: any) => unflattenObject(o));
				} else {
					const operatorParts = operator.split(".");
					const isValid = operatorParts.every((part) => {
						if (part.indexOf("$") > -1) {
							return isOperatorValid(part);
						} else {
							return true;
						}
					});
					if (isValid) {
						filter = {
							...filter,
							...unflattenObject({ [operator]: filters[operator] }),
						};
					} else {
						throw Error(`Invalid operator: ${operator}`);
					}
				}
			}
		}
	}

	return filter;
}

export function parseQueryParams(queryParams: FilterQueryParams) {
	const parsedQueryParams: any = {};

	const filterObj = parseFilter(queryParams);

	if (Object.keys(filterObj).length > 0) {
		parsedQueryParams.filters = filterObj;
	}

	if (queryParams.sort) {
		parsedQueryParams.sort = queryParams.sort
			.split(",")
			.reduce((acc: any, field: string) => {
				const direction = field.startsWith("-") ? -1 : 1;
				const fieldName = field.startsWith("-") ? field.slice(1) : field;
				acc[fieldName] = direction;
				return acc;
			}, {});
	}

	if (queryParams.limit) {
		parsedQueryParams.limit = Number(queryParams.limit);
	}

	if (queryParams.page) {
		parsedQueryParams.page = Number(queryParams.page);
	}

	return parsedQueryParams;
}

export function buildMongoQuery(queryParams: FilterQueryParams) {
	const parsedQueryParams = parseQueryParams(queryParams);

	const mongoQuery: any = {
		filters: parsedQueryParams.filters || {},
		options: {
			sort: parsedQueryParams.sort || {},
		},
	};

	if (parsedQueryParams.limit) {
		mongoQuery.options.limit = parsedQueryParams.limit;
	}

	if (parsedQueryParams.page && parsedQueryParams.limit) {
		mongoQuery.options.skip =
			(parsedQueryParams.page - 1) * parsedQueryParams.limit;
	}

	// console.log(JSON.stringify({ mongoQuery }, null, 2));
	return mongoQuery;
}
