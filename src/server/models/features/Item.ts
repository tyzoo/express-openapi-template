import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import { BaseModel } from "../core/BaseModel";

@pre<Item>("save", async function () {
	if (this.isNew) {
		this.rng = Math.random();
	}
})
export class Item extends BaseModel {
	@prop({ required: true })
	public name!: string;

	@prop({ immutable: true })
	public rng?: number;
}

export const ItemModel = getModelForClass(Item);
