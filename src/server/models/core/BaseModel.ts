import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { plugin } from '@typegoose/typegoose';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import paginate from 'mongoose-paginate-v2';

export type PaginateMethod<T> = (
  query?: FilterQuery<T>,
  options?: PaginateOptions,
  callback?: (err: any, result: PaginateResult<T>) => void,
) => Promise<PaginateResult<T>>;

@plugin(paginate)

export class BaseModel extends TimeStamps {

  constructor() {
    super()
  }

  static paginate: PaginateMethod<BaseModel>;

}