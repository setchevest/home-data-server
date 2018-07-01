import IThermostatModel, { ThermostatMode } from "../model/interfaces/IThermostatModel";
import IThermostatBusiness from "./interfaces/IThermostatBusiness";
import { IThermostatConfig } from "app/model/interfaces/IThermostatConfig";
import AppConfig from "./../../config/AppConfig";
import axios from "axios";
import BaseBusiness from "./Base/BaseBusiness";
import ThermostatRepository from "../repository/ThermostatRepository";
import TemperatureSensorDataBusiness from "./TemperatureSensorDataBusiness";
import ITemperatureSensorDataModel from "../model/interfaces/ITemperatureSensorDataModel";


// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request)
//     return request
//   });

//   axios.interceptors.response.use(request => {
//     console.log('Starting Response', request)
//     return request
//   });

import { sealed } from "../../core/Decorators";
import ZoneBusiness from "./ZoneBusiness";

@sealed
export default class ThermostatBusiness extends BaseBusiness<IThermostatModel> implements IThermostatBusiness {

    constructor() {
        super(new ThermostatRepository());
    }

    private defaultConfig: IThermostatConfig = <IThermostatConfig>{
        updateFrequency: 6000,
        heaterPin: 8,
        zones: [
            { zoneId: 1, name: "Cocina" }],
        threshold: {
            min: 19,
            max: 21,
            controlZoneId: 1
        }
    };

    public getConfiguration(): IThermostatConfig {
        return this.defaultConfig;
    }

    public getStatus(callback: (error: any, result: any) => void): void {
        axios.get(AppConfig.Instance.THERMOSTAT_URL).then(response => {
            this.saveCurrentData(response);
            var data = {
                isOn: response.data.heater.status == "ON",
                temperature: response.data.zones[0].temp,
                humidity: response.data.zones[0].hum,
                mode: response.data.mode == "Manual" ? ThermostatMode.Manual.toString() : ThermostatMode.Automatic.toString()
            };
            callback(null, data);
        }).catch(error => {
            callback(error, null);
        });
    }


    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    public setPower(power: boolean, callback: (error: any, result: any) => void): void {
        var url = AppConfig.Instance.THERMOSTAT_URL + (power ? "/on" : "/off");
        axios.get(url).then(response => {

            this.saveCurrentData(response);
            var data = {
                isOn: response.data.heater.status == "ON",
                mode: ThermostatMode.Manual.toString(),
                
            };
            this.create(<IThermostatModel>data, (saveError, saveResult) => {

                var resp={
                    isOn: saveResult.isOn,
                    mode: saveResult.mode,
                    temperature: response.data.zones[0].temp,
                    humidity: response.data.zones[0].hum,
                };
                
                callback(null, resp);
            });
        }).catch(error => {
            callback(error, null);
        });
    }

    public setMode(mode: ThermostatMode, callback: (error: any, result: any) => void): void {
        var url = mode == ThermostatMode.Manual ? "/manual" : "/auto";
        axios.get(AppConfig.Instance.THERMOSTAT_URL + url).then(response => {

            this.saveCurrentData(response);

            var data = {
                isOn: response.data.heater.status == "ON",
                mode: mode.toString()
            };
            this.create(<IThermostatModel>data, (saveError, saveResult) => {

                var resp = {
                    isOn: saveResult.isOn,
                    mode: saveResult.mode,
                    temperature: response.data.zones[0].temp,
                    humidity: response.data.zones[0].hum,
                };
                callback(null, resp);
            });

        }).catch(error => {
            callback(error, null);
        });
    }


    private saveCurrentData(response: any) {
        if(response.data.zones){
            var sensorBussiness: TemperatureSensorDataBusiness = new TemperatureSensorDataBusiness();
            var zoneBusiness: ZoneBusiness = new ZoneBusiness();
            response.data.zones.forEach(aZone => {
                zoneBusiness.findByInternalId(<number>aZone.id, function (error, zone) {
                    if (zone) {
                        sensorBussiness.create(<ITemperatureSensorDataModel>{
                            zone: zone._id,
                            temperature: <number>aZone.temp,
                            humidity: <number>aZone.hum
                        }, function () { });
                    }
                }); 
            });
        }
        
    }
}
