import * as mongoose from "mongoose";

export default class BaseModel<T extends mongoose.Document> {
   
   protected _model: T;
   
   constructor(model: T) {
       this._model = model;
   } 
}
Object.seal(BaseModel);