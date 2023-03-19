import mongoose from "mongoose";
import {
	Get,
	Route,
	Tags,
	Body,
	Post,
	Put,
	Delete,
	Response,
	Path,
	Example,
	Security,
	Queries,
} from "tsoa";
import { ItemModel, Item, User_Scopes } from "../../models";
import { APIError } from "../../utils";
import { buildMongoQuery, FilterQueryParams } from "../../utils/db/mongoQuery";

@Route("crud")
@Tags("CRUD")
export class CrudController {
	/**
	 * Get all items
	 * @summary Get all items (With Pagination, Sorting, Filtering)
	 * @returns { Item[] } Array of Items
	 */
	@Get("")
	@Example<(Item & { _id: string })[]>(
		[
			{
				_id: "62f05f918c8a2e1d6608dfd2",
				name: "Item 4",
				rng: 0.9992763155631645,
			},
		],
		"Successful Response",
	)
	public async findAllItems(@Queries() queryParams: FilterQueryParams) {
		const mongoQuery = buildMongoQuery(queryParams);
		const items = await ItemModel.find(mongoQuery.filters)
			.sort(mongoQuery.options.sort)
			.skip(mongoQuery.options.skip)
			.limit(mongoQuery.options.limit)
			.select("-__v");
		return items;
	}

	/**
	 * Get Item by ID
	 * @summary Get Item By ID
	 * @param itemId Document MongoID
	 * @returns { Item } Item
	 */
	@Get("{itemId}")
	@Example<Item & { _id: string }>(
		{
			_id: "62f05f918c8a2e1d6608dfd2",
			name: "Item 4",
			rng: 0.9992763155631645,
		},
		"Successful Response",
	)
	public async findItem(
		@Path() itemId: mongoose.Types.ObjectId,
	): Promise<(Item & { _id: string }) | null> {
		return ItemModel.findById(itemId).select(["-__v"]);
	}

	/**
	 * Create an Item
	 * @summary Create an Item
	 * @param body Provide new document contents
	 * @returns { Item } New Item
	 */
	@Post("")
	@Example<Item & { _id: string }>(
		{
			_id: "62f05f918c8a2e1d6608dfd2",
			name: "Item 4",
			rng: 0.9992763155631645,
		},
		"Successful Response",
	)
	public async createItem(
		@Body() body: { name: string },
	): Promise<Item & { _id: string }> {
		return ItemModel.create(body);
	}

	/**
	 * Update an Item
	 * @summary Update an Item (User Only)
	 * @param itemId Document MongoID
	 * @param body Content to update to
	 * @returns { Item } Updated Item
	 */
	@Put("{itemId}")
	@Security("jwt", [User_Scopes.USER])
	@Example<Item & { _id: string }>(
		{
			_id: "62f05f918c8a2e1d6608dfd2",
			name: "Item 4",
			rng: 0.9992763155631645,
		},
		"Successful Response",
	)
	@Response<{ message: string }>(401, "Unauthorized", {
		message: `Unauthorized request`,
	})
	public async updateItem(
		@Path() itemId: mongoose.Types.ObjectId,
		@Body()
		body: {
			name: string;
		},
	): Promise<Item & { _id: string }> {
		const item = await ItemModel.findById(itemId);
		if (!item) throw new APIError(404, `Item not found`);
		item.name = body.name;
		await item.save();
		return item;
	}

	/**
	 * Delete an Item
	 * @summary Delete an Item  (Admin Only)
	 * @param itemId Document MongoID
	 * @returns { Item } Deleted Item
	 */
	@Delete("{itemId}")
	@Example<Item & { _id: string }>(
		{
			_id: "62f05f918c8a2e1d6608dfd2",
			name: "Item 4",
			rng: 0.9992763155631645,
		},
		"Successful Response",
	)
	@Security("jwt", [User_Scopes.ADMIN])
	@Response<{ message: string }>(401, "Unauthorized", {
		message: `Unauthorized request`,
	})
	public async deleteItem(
		@Path() itemId: mongoose.Types.ObjectId,
	): Promise<Item & { _id: string }> {
		const item = await ItemModel.findById(itemId);
		if (!item) throw new APIError(404, `Item not found`);
		await item.remove();
		return item;
	}
}
