import IModel from "./IModel";
import IZoneModel from "./IZoneModel";
export default interface ISensorDataModel extends IModel {
  zone: any;
  type: string;
}
