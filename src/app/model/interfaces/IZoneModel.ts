import IModel from "./IModel";

export default interface IZoneModel extends IModel {
  internalId: number;
  name: string;
}
