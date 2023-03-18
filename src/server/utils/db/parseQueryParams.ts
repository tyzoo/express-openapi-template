export interface QueryParams {
	filter?: string;
	sort?: Record<string, 1 | -1>;
	limit?: number;
	page?: number;
}

const parseSort = (sortStr: string): Record<string, 1 | -1> => {
	const sortObj = JSON.parse(sortStr);
	const parsedSort: Record<string, 1 | -1> = {};
	for (const key in sortObj) {
		parsedSort[key] = sortObj[key] === "asc" ? 1 : -1;
	}
	return parsedSort;
};

export const parseQueryParams = (query: any): QueryParams => {
	const filter = query.filter ? JSON.parse(query.filter) : undefined;
	const sort = query.sort ? parseSort(query.sort) : undefined;
	const limit = query.limit ? parseInt(query.limit, 10) : undefined;
	const page = query.page ? parseInt(query.page, 10) : undefined;
	return { filter, sort, limit, page };
};
