import * as mongoose from "mongoose";
export default interface IHeaterModel extends mongoose.Document {
  mode: string;
  isOn: boolean;
  temperature: number;
  humidity:number;
}
