import IModel from './IModel';
export default interface IThermostatModel extends IModel {
  mode: string;
  isOn: boolean;
}

export enum ThermostatMode {
  Manual = 'Manual',
  Automatic = 'Automatic',
}
