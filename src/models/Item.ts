import { prop, getModelForClass, pre } from "@typegoose/typegoose";

@pre<Item>("save", async function() {
    if(this.isNew){
        this.rng = Math.random();
    }
})

export class Item {

  @prop({ required: true })
  public name!: string;

  @prop({ immutable: true })
  public rng?: number;

}

export const ItemModel = getModelForClass(Item);