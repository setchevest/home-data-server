import DataAccess from "./../../dataAccess/DataAccess";
import IHeaterStatusModel from "./../../model/interfaces/IHeaterStatusModel";
import { Schema } from "mongoose";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

export class HeaterStatusSchema {
   
  static get schema () : Schema {
       var schema = new Schema({
           mode : {
               type: String,
               required: true
           },
           isOn: {
               type: Boolean,
               required: true
           },
           temperature: {
               type: Number,
               required: false
           }},
           { 
               timestamps: true
            });
       
       return schema;
   }
   
}
var schema = mongooseConnection.model<IHeaterStatusModel>("HeaterStatus", HeaterStatusSchema.schema);
export default schema;