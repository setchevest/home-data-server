import IModel from './interfaces/IModel';
import { sealed } from '../../core/decorators/Sealed';

@sealed
export default class BaseModel<T extends IModel> {
   
   protected _model: T;
   
   constructor(model: T) {
       this._model = model;
   }

}
