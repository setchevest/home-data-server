export interface IRequestConfig  {
  host: string;
  port: number;
  path: string;
}

export interface IZoneConfig  {
  zoneId: number;
  name: string;
  sensorPin: number;
}

export interface IEthernetConfig  {
  defaultMac: string;
  defaultIp: string;
  port: number;
  server: IRequestConfig;
}

export interface IThermostatTemperatureConfig  {
  min: number;
  max: number;
  controlZoneId: number;
}

export interface IThermostatConfig  {
  updateFrequency: number;
  heaterPin: number;
  zones: Array<IZoneConfig>;
  threshold: IThermostatTemperatureConfig; 
}

