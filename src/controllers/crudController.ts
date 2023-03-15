import mongoose from "mongoose";
import { Get, Route, Tags, Body, Post, Put, Delete, Response, Path, Example, Security } from "tsoa";
import { APIError } from "../utils";
import { ItemModel, Item, Scopes } from "../models";

@Route("crud")
@Tags("CRUD")

export class CrudController {

/**
 * Get all items
 * @summary Get all items
 * @returns { Item[] } Array of Items
 */
  @Get("")
  @Example<(Item & { _id: string })[]>([
    {
      _id: "62f05f918c8a2e1d6608dfd2",
      name: "Item 4",
      rng: 0.9992763155631645
    },
  ], "Successful Response")
  public async findAllitems(): Promise<(Item & { _id: string })[]> {
    return ItemModel.find({}).select(["-__v"]);
  }

/**
 * Get Item by ID
 * @summary Get Item By ID
 * @param itemId Document MongoID
 * @returns { Item } Item
 */
  @Get("{itemId}")
  @Example<Item & { _id: string }>({
    _id: "62f05f918c8a2e1d6608dfd2",
    name: "Item 4",
    rng: 0.9992763155631645
  }, "Successful Response")
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
  @Example<Item & { _id: string }>({
    _id: "62f05f918c8a2e1d6608dfd2",
    name: "Item 4",
    rng: 0.9992763155631645
  }, "Successful Response")
  public async createItem(
    @Body() body: {
      name: string;
    },
  ): Promise<(Item & { _id: string })> {
    return ItemModel.create(body);
  }


 /**
  * Update an Item
  * @summary Update an Item
  * @param itemId Document MongoID
  * @param body Content to update to
  * @returns { Item } Updated Item
  */
  @Put("{itemId}")
  @Security("jwt", [Scopes.ADMIN])
  @Example<Item & { _id: string }>({
    _id: "62f05f918c8a2e1d6608dfd2",
    name: "Item 4",
    rng: 0.9992763155631645
  }, "Successful Response")
  @Response<{ message: string; }>(401, "Unauthorized", { message: `Unauthorized request` })
  public async updateItem(
    @Path() itemId: mongoose.Types.ObjectId,
    @Body() body: {
      name: string;
    },
  ): Promise<(Item & { _id: string })> {
    let item = await ItemModel.findById(itemId);
    if (!item) throw new APIError(404, `Item not found`);
    item.name = body.name;
    await item.save();
    return item;
  }

/**
 * Delete an Item
 * @summary Delete an Item
 * @param itemId Document MongoID
 * @returns { Item } Deleted Item
 */
  @Delete("{itemId}")
  @Example<Item & { _id: string }>({
    _id: "62f05f918c8a2e1d6608dfd2",
    name: "Item 4",
    rng: 0.9992763155631645
  }, "Successful Response")
  @Security("jwt", [Scopes.ADMIN])
  @Response<{ message: string; }>(401, "Unauthorized", { message: `Unauthorized request` })
  public async deleteItem(
    @Path() itemId: mongoose.Types.ObjectId,
  ): Promise<(Item & { _id: string })> {
    let item = await ItemModel.findById(itemId);
    if (!item) throw new APIError(404, `Item not found`);
    await item.remove();
    return item;
  }
}