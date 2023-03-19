import {
	Get,
	Route,
	Tags,
	Body,
	Post,
	Middlewares,
	Request,
	Queries,
} from "tsoa";
import express from "express";
import { decentralandRequired } from "../../middleware";
import { Guestbook, GuestbookModel } from "../../models";
import { buildMongoQuery, FilterQueryParams } from "../../utils/db/mongoQuery";
import { PaginateResult } from "mongoose";

@Route("/guestbook")
@Tags("Guestbook")
export class GuestbookController {
	/**
	 * Get all items
	 * @summary Get all items
	 * @returns { PaginateResult<Guestbook> } Array of Items
	 */
	@Get("")
	public async findAllItems(
		@Queries() queryParams: FilterQueryParams
	): Promise<PaginateResult<Guestbook>> {
		const mongoQuery = buildMongoQuery(queryParams);
		const items = await GuestbookModel.paginate({
			...mongoQuery.filters,
		}, {
			...mongoQuery.options,
			select: ["-__v"],
		});
		return items as PaginateResult<Guestbook>;
	}

	/**
	 * Create an Item
	 * @summary Create an Item
	 * @param body Provide new document contents
	 * @returns { Guestbook } New Item
	 */
	@Post("")
	@Middlewares(decentralandRequired([10, 10]))
	public async createItem(
		@Body()
		body: {
			address: string;
			message: string;
		},
		@Request() req: express.Request,
	): Promise<Guestbook & { _id: string }> {
		const res = req.res!;

		res.locals.address; //the verified signed fetch address
		res.locals.metadata; //the signed fetch metadata etc.

		return GuestbookModel.create(body);
	}
}
