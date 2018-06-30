import IModel from "./interfaces/IModel";
import { sealed } from "../../core/Decorators";

@sealed
export default class BaseModel<T extends IModel> {
   
   protected _model: T;
   
   constructor(model: T) {
       this._model = model;
   } 

   get _id(): any {
       return this._model._id;
   }

}