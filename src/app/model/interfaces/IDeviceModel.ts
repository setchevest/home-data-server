import IModel from './IModel';
export default interface IDeviceModel extends IModel {
  type: string;
  name: string;
  enabled: Boolean;
  config: any;
}
