import { Get, Route, Tags, Body, Post, Middlewares, Request } from "tsoa";
import express from "express";
import { decentralandRequired } from "../middleware";
import { Guestbook, GuestbookModel } from "../models";

@Route("/guestbook")
@Tags("Guestbook")
export class GuestbookController {
	/**
	 * Get all items
	 * @summary Get all items
	 * @returns { Guestbook[] } Array of Items
	 */
	@Get("")
	public async findAllitems(): Promise<(Guestbook & { _id: string })[]> {
		return GuestbookModel.find({}).select(["-__v"]);
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
