import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import { ethers } from "ethers";

@pre<User>("save", async function() {
    if(this.isNew){
        try {
            this.address = ethers.utils.getAddress(this.address)
        }catch(err:any) {
            throw Error(`Invalid ethereum address ${err.message}`)
        }
    }
})

export class User {

  @prop({ required: true, immutable: true })
  public address!: string;

  @prop({ required: true, default: false })
  public admin!: boolean;

}

export default getModelForClass(User);