import mongoose from "mongoose";
import { Get, Route, Middlewares, Tags, Body, Post, Put, Delete, Response, Path } from "tsoa";
import ironSession from "../middleware/ironSession";
import authMiddleware from "../middleware/auth";
import { APIError } from "../utils";
import { ItemModel, Item } from "../../models/Item";

@Route("crud")
@Tags("CRUD")

export class CrudController {

  /**
   * Get all items
   * @summary Get all items
   */
  @Get("")
  public async findAllitems(): Promise<(Item & { _id: string })[]> {
    return ItemModel.find({}).select(["-__v"]);
  }

  /**
   * Get Item by ID
   * @summary Get Item By ID
   */
  @Get("{itemId}")
  public async findItem(
    @Path() itemId: mongoose.Types.ObjectId,
  ): Promise<(Item & { _id: string }) | null> {
    return ItemModel.findById(itemId).select(["-__v"]);
  }

  /**
   * Create an Item
   * @summary Create an Item
   */
  @Post("")
  public async createItem(
    @Body() body: {
      name: string;
    },
  ): Promise<(Item & { _id: string })> {
    return ItemModel.create({
      name: body.name,
    });
  }


  /**
   * Update an Item
   * @summary Update an Item
   */
  @Put("{itemId}")
  @Middlewares([
    ironSession,
    authMiddleware.jwtHeaderOrSession,
  ])
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
   */
  @Delete("{itemId}")
  @Middlewares([
    ironSession,
    authMiddleware.jwtHeaderOrSession,
  ])
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