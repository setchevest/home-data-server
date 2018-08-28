import IDeviceModel from './IDeviceModel';
export interface IGenericDeviceModel extends IDeviceModel {
  registrationData: any;
}

export function isIGenericDeviceModel(object: object): object is IGenericDeviceModel {
  return 'registrationData' in object;
}