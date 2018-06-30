import IThermostatModel, { ThermostatMode } from "../model/interfaces/IThermostatModel";
import IThermostatBusiness from "./interfaces/IThermostatBusiness";
import { IThermostatConfig } from "app/model/interfaces/IThermostatConfig";
import AppConfig from "./../../config/AppConfig";
import axios from "axios";
import BaseBusiness from "./Base/BaseBusiness";
import ThermostatRepository from "../repository/ThermostatRepository";
import ThermostatModel from "../model/ThermostatModel";

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request)
//     return request
//   });

//   axios.interceptors.response.use(request => {
//     console.log('Starting Response', request)
//     return request
//   });

import { sealed } from "../../core/Decorators";
@sealed
export default class ThermostatBusiness extends BaseBusiness<IThermostatModel> implements IThermostatBusiness {

    constructor () {
        super(new ThermostatRepository());
    } 

    private defaultConfig: IThermostatConfig = <IThermostatConfig>{
        updateFrequency: 6000,
        heaterPin: 8,
        zones: [
            { zoneId: 1, name: "Cocina" }],
        threshold: {
            min: 20,
            max: 23,
            controlZoneId: 1
        }
    };

    public getConfiguration(): IThermostatConfig {
        return this.defaultConfig;
    }

    public getStatus(callback: (error: any, result: any) => void): void {
        axios.get(AppConfig.Instance.THERMOSTAT_URL).then(response => {
            var data = {
                isOn: response.data.heater.status == "ON",
                // temperature: response.data.zones[0].temp,
                // humidity: response.data.zones[0].hum,
                mode: response.data.mode == "Manual"? ThermostatMode.Manual.toString() : ThermostatMode.Automatic.toString()
            };
            callback(null, <ThermostatModel>data);
        }).catch(error => {
            callback(error, false);
        });
    }

    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    public setPower(power: boolean, callback: (error: any, result: any) => void): void {
        var url = AppConfig.Instance.THERMOSTAT_URL + (power ? "/on" : "/off");
        axios.get(url).then(response => {
            var data = {
                isOn: response.data.heater.status == "ON",
                // temperature: response.data.zones[0].temp,
                // humidity: response.data.zones[0].hum,
                mode: ThermostatMode.Manual.toString()
            };
            
            this.create(<IThermostatModel>data, (saveError, saveResult) => {
                callback(null, saveResult);
            });
        }).catch(error => {
            callback(error, false);
        });
    }

    public setMode(mode: ThermostatMode, callback: (error: any, result: any) => void): void {
        var url = mode == ThermostatMode.Manual ? "/manual" : "/auto";
        axios.get(AppConfig.Instance.THERMOSTAT_URL + url).then(response => {

            var data = {
                isOn: response.data.heater.status == "ON",
                // temperature: response.data.zones[0].temp,
                // humidity: response.data.zones[0].hum,
                mode: mode.toString()
            };
            this.create(<IThermostatModel>data, (saveError, saveResult) => {
                callback(null, saveResult);
            });

        }).catch(error => {
            callback(error, false);
        });
    }
}
