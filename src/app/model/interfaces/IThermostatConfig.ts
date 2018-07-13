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

export interface IThermostatHeater  {
  status: string;
}

export interface IThermostatZone  {
  id: number;
  temp: number;
  hum?: number;
}

// {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
export interface IThermostatResponse  {
  fm: number;
  lu: number;
  mode: string;
  heater: IThermostatHeater;
  zones: IThermostatZone[]; 
}

