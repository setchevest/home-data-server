import * as mongoose from "mongoose";

export default interface IHeroModel extends mongoose.Document {
  power: string;
  amountPeopleSaved: number;
  name: string;
}
