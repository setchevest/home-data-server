import IThermostatModel, { ThermostatMode } from "../model/interfaces/IThermostatModel";
import IThermostatBusiness from "./interfaces/IThermostatBusiness";
import { IThermostatConfig, IThermostatResponse } from "app/model/interfaces/IThermostatConfig";
import BaseBusiness from "./Base/BaseBusiness";
import ThermostatRepository from "../repository/ThermostatRepository";
import TemperatureSensorDataBusiness from "./TemperatureSensorDataBusiness";
import ITemperatureSensorDataModel from "../model/interfaces/ITemperatureSensorDataModel";
import { sealed } from "../../core/Decorators";
import ZoneBusiness from "./ZoneBusiness";
import IThermostatDevice from "../devices/interfaces/IThermostatDevice";

@sealed
export default class ThermostatBusiness extends BaseBusiness<IThermostatModel> implements IThermostatBusiness {

    private thermostatDevice : IThermostatDevice;

    constructor(thermostatDevice : IThermostatDevice) {
        super(new ThermostatRepository());
        this.thermostatDevice = thermostatDevice;
    }

    public getConfiguration(callback: (error: any, result: any) => void): void {
        this.thermostatDevice.getCurrentConfiguration()
        .then(res=> callback(null, res))
        .catch(err=>callback(err, null));
    }

    public getStatus(callback: (error: any, result: any) => void): void {
        this.thermostatDevice.getStatus()
        .then(this.saveArduinoData)
        .then(thermostatResponse => {
            var data = {
                isOn: thermostatResponse.heater.status == "ON",
                temperature: thermostatResponse.zones[0].temp,
                humidity: thermostatResponse.zones[0].hum,
                mode: thermostatResponse.mode == "Manual" ? ThermostatMode.Manual.toString() : ThermostatMode.Automatic.toString()
            };
            callback(null, data);
        }).catch(error => {
            callback(error, null);
        });
    }


    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    public setPower(power: boolean, callback: (error: any, result: any) => void): void {
        
        this.thermostatDevice.setPower(power)
        .then(this.saveArduinoData)
        .then( thermostatResponse => {
            this.create(<IThermostatModel>{isOn: thermostatResponse.heater.status == "ON",mode: ThermostatMode.Manual.toString()})
            .then(function(saveResult){
                
                var resp={
                    isOn: saveResult.isOn,
                    mode: saveResult.mode,
                    temperature: thermostatResponse.zones[0].temp,
                    humidity: thermostatResponse.zones[0].hum,
                }
                
                callback(null, resp);
            }).catch(error => {
                callback(error, null);
            });
            }).catch(error => {
            callback(error, null);
        });
    }

    public setMode(mode: ThermostatMode, callback: (error: any, result: any) => void): void {
        this.thermostatDevice.setMode(mode)
        .then(this.saveArduinoData)
        .then( thermostatResponse =>{
            this.create(<IThermostatModel>{isOn: thermostatResponse.heater.status == "ON",mode: mode.toString()})
            .then(function(saveResult){
                
                var resp={
                    isOn: saveResult.isOn,
                    mode: saveResult.mode,
                    temperature: thermostatResponse.zones[0].temp,
                    humidity: thermostatResponse.zones[0].hum,
                }
                
                callback(null, resp);
            }).catch(error => {
                callback(error, null);
            });
            }).catch(error => {
            callback(error, null);
        });
    }

    private saveArduinoData(response: IThermostatResponse) : IThermostatResponse {
        if(response.zones){
            var sensorBussiness: TemperatureSensorDataBusiness = new TemperatureSensorDataBusiness();
            var zoneBusiness: ZoneBusiness = new ZoneBusiness();
            response.zones.forEach(aZone => {
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
        return response;
    }
}
