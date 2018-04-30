import IHeaterStatusModel from "./interfaces/IHeaterStatusModel";

export default class HeaterStatusModel {
   
   private _model: IHeaterStatusModel;
   
   constructor(model: IHeaterStatusModel) {
       this._model = model;
   }
   get mode (): string {
       return this._model.mode;
   }
   
   get isOn (): boolean {
       return this._model.isOn;
   }
   
   get temperature (): number {
       return this._model.temperature;
   }
   
    
}
Object.seal(HeaterStatusModel);