import * as mongoose from "mongoose";

export interface IRequestConfig extends mongoose.Document {
  host: string;
  port: number;
  path: string;
}

export interface IZoneConfig extends mongoose.Document {
  zoneId: number;
  name: string;
  sensorPin: number;
}

export interface IEthernetConfig extends mongoose.Document {
  defaultMac: string;
  defaultIp: string;
  port: number;
  server: IRequestConfig;
}

export interface IThermostatTemperatureConfig extends mongoose.Document {
  min: number;
  max: number;
  controlZoneId: number;
}

export interface IThermostatConfig extends mongoose.Document {
  updateFrequency: number;
  heaterPin: number;
  zones: Array<IZoneConfig>;
  threshold: IThermostatTemperatureConfig; 
}

