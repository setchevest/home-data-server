import IModel from './IModel';

export default interface IDeviceModel extends IModel {
  name: string;
  enabled: Boolean;
  config: any;
}


