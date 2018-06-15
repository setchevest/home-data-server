import IHeaterStatusModel from "../model/interfaces/IHeaterStatusModel";
import IHeaterStatusBusiness from "./interfaces/IHeaterStatusBusiness";
import IThermostatBusiness from "./interfaces/IThermostatBusiness";
import { IThermostatConfig } from "app/model/interfaces/IThermostatConfig";
import { ThermostatMode } from "../../app/model/ThermostatConfigModel";
import AppConfig from "./../../config/AppConfig";
import axios from "axios";
import * as logger from "morgan";

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request)
//     return request
//   });

//   axios.interceptors.response.use(request => {
//     console.log('Starting Response', request)
//     return request
//   });

export default class ThermostatBusiness implements IThermostatBusiness {

    private heaterStatusBusiness: IHeaterStatusBusiness;
    /**
     *
     */
    constructor(heaterStatusBusiness: IHeaterStatusBusiness) {
        this.heaterStatusBusiness = heaterStatusBusiness;

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
    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    public setPower(power: boolean, callback: (error: any, result: any) => void): void {
        var url = AppConfig.Instance.THERMOSTAT_URL + (power ? "/on" : "/off");
        axios.get(url).then(response => {
            var data = {
                isOn: response.data.heater.status == "ON",
                temperature: response.data.zones[0].temp,
                humidity: response.data.zones[0].hum,
                mode: ThermostatMode.Manual.toString()
            };
            this.heaterStatusBusiness.create(<IHeaterStatusModel>data, (saveError, saveResult) => {
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
                temperature: response.data.zones[0].temp,
                humidity: response.data.zones[0].hum,
                mode: mode.toString()
            };
            this.heaterStatusBusiness.create(<IHeaterStatusModel>data, (saveError, saveResult) => {
                callback(null, saveResult);
            });

        }).catch(error => {
            callback(error, false);
        });
    }
}



Object.seal(ThermostatBusiness);