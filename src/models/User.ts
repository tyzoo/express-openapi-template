import { prop, getModelForClass, pre, index, modelOptions, Severity } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ethers } from "ethers";

export enum Scopes {
    ADMIN = "admin",
    USER = "user",
    BANNED = "banned",
    VERIFIED = "verified",
};

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

  /**
   * Privleged access to API's and other account flags
   * @example ["user", "banned", "verified", "admin"]
   */
  @prop({ required: false, default: [] })
  public scopes?: Scopes[];

  /**
   * Store latest JWT for authorizaiton
   */
  @prop({ required: false, select: false, default: null })
  public jwt?: string;
}

export const UserModel = getModelForClass(User);