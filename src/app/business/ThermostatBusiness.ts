import IHeaterStatusModel from "../model/interfaces/IHeaterStatusModel";
import IHeaterStatusBusiness from "./interfaces/IHeaterStatusBusiness";
import IThermostatBusiness from "./interfaces/IThermostatBusiness";
import { IThermostatConfig } from "app/model/interfaces/IThermostatConfig";
import { ThermostatMode } from "../../app/model/ThermostatConfigModel";
import axios from "axios";


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

    getConfiguration(): IThermostatConfig {
        return this.defaultConfig;
    }
    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    turnOn(callback: (error: any, result: any) => void): void {
        axios.get("http://192.168.0.16:9000/on").then(response => {
            this.heaterStatusBusiness.create(<IHeaterStatusModel>{
                isOn: response.data.heater.status == "ON",
                temperature: response.data.zones[0].temp,
                humidity: response.data.zones[0].hum,
                mode: ThermostatMode.Manual.toString()
            }, (saveError, saveResult) => {

            });
            
            callback(null, response.data);
        }).catch(error => {
            callback(error, false);
        });
    }

    turnOff(callback: (error: any, result: any) => void): void {
        axios.get("http://192.168.0.16:9000/off")
            .then(response => {
                this.heaterStatusBusiness.create(<IHeaterStatusModel>{
                    isOn: response.data.heater.status == "ON",
                    temperature: response.data.zones[0].temp,
                    humidity: response.data.zones[0].hum,
                    mode: ThermostatMode.Manual.toString()
                }, (saveError, saveResult) => {
                    
                });
                callback(null, response.data);
            }).catch(error => {
                callback(error, false);
            });
    }

    setMode(mode: ThermostatMode, callback: (error: any, result: boolean) => void): void {
        var url = mode == ThermostatMode.Manual ? "manual" : "auto";
        axios.get("http://192.168.0.16:9000/" + url).then(response => {
            this.heaterStatusBusiness.create(<IHeaterStatusModel>{
                isOn: response.data.heater.status == "ON",
                temperature: response.data.zones[0].temp,
                humidity: response.data.zones[0].hum,
                mode: mode.toString()
            }, (saveError, saveResult) => {

            });
            callback(null, response.data);
        }).catch(error => {
            callback(error, false);
        });
    }
}



Object.seal(ThermostatBusiness);