import { prop, getModelForClass, pre, index } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ethers } from "ethers";

@pre<User>("save", async function() {
    if(this.isNew){
        try {
            this.address = ethers.utils.getAddress(this.address)
        }catch(err:any) {
            throw Error(`Invalid ethereum address`)
        }
    }
})

@index({ address: 1 }, { unique: true })

export class User extends TimeStamps {

  @prop({ required: true, immutable: true })
  public address!: string;

  @prop({ required: true, default: false })
  public admin!: boolean;

  @prop({ required: false })
  public nonce?: string;

}

export default getModelForClass(User);