import BaseModel from "./BaseModel";
import {IRequestConfig, IZoneConfig, IEthernetConfig, IThermostatConfig, IThermostatTemperatureConfig} from "./interfaces/IThermostatConfig";

export class RequesConfigModel extends BaseModel<IRequestConfig> {
   get host (): string {
       return this._model.host;
   }
   
   get port (): number {
       return this._model.port;
   }
   
   get path (): string {
       return this._model.path;
   }
}
Object.seal(RequesConfigModel);

export class ZoneConfigModel extends BaseModel<IZoneConfig> {
   
    get id (): number {
        return this._model.zoneId;
    }
    
    get name (): string {
        return this._model.name;
    }
    
    get sensorPin (): number {
        return this._model.sensorPin;
    }
 }
 Object.seal(ZoneConfigModel);

 export class EthernetConfigModel extends BaseModel<IEthernetConfig> { 
    get defaultMac (): string {
        return this._model.defaultMac;
    }
    
    get defaultIp (): string {
        return this._model.defaultIp;
    }
    
    get port (): number {
        return this._model.port;
    }

    get server (): IRequestConfig {
        return this._model.server;
    }
 }

 Object.seal(EthernetConfigModel);

 export class ThermostatTemperatureConfigModel extends BaseModel<IThermostatTemperatureConfig> { 
    get min (): number {
        return this._model.min;
    }
    get max (): number {
        return this._model.max;
    }
    get controlZoneId (): number {
        return this._model.controlZoneId;
    }
 }
 Object.seal(ThermostatTemperatureConfigModel);
 
 export class ThermostatConfigModel extends BaseModel<IThermostatConfig> { 
    get updateFrequency (): number {
        return this._model.updateFrequency;
    }
    
    get heaterPin (): number {
        return this._model.heaterPin;
    }
    
    get zones (): Array<IZoneConfig> {
        return this._model.zones;
    }

    get threshold (): IThermostatTemperatureConfig {
        return this._model.threshold;
    }
 }
Object.seal(ThermostatConfigModel);

 export enum ThermostatMode {
    Manual = "Manual",
    Automatic = "automatic",
}

 Object.seal(ThermostatMode);