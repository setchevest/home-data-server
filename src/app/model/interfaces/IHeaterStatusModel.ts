import * as mongoose from "mongoose";

export default interface IHeaterModel extends mongoose.Document {
  name: string;
  isOn: boolean;
  temperature: number;
}
