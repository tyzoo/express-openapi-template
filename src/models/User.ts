import { prop, getModelForClass, pre, index, modelOptions, Severity } from "@typegoose/typegoose";
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
@modelOptions({ options: { allowMixed: Severity.ALLOW } })

export class User extends TimeStamps {

  @prop({ required: true, immutable: true })
  public address!: string;

  @prop({ required: false })
  public nonce?: string;

  @prop({ required: false, default: [] })
  public scopes?: string[];

  @prop({ required: false, select: false, default: null })
  public jwt?: string;
}

export const UserModel = getModelForClass(User);