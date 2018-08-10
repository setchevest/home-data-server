import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import IThermostatModel, { ThermostatMode } from '../model/interfaces/IThermostatModel';
import IThermostatBusiness from './interfaces/IThermostatBusiness';
import { IThermostatResponse } from '../model/interfaces/IThermostatConfig';
import BaseBusiness from './Base/BaseBusiness';
import ITemperatureSensorDataModel from '../model/interfaces/ITemperatureSensorDataModel';
import { sealed } from '../../core/decorators/Sealed';
import IThermostatDevice from '../devices/interfaces/IThermostatDevice';
import IRepository from '../repository/interfaces/IRepository';
import IBaseBusiness from './interfaces/base/IBaseBusiness';
import IZoneModel from '../model/interfaces/IZoneModel';
import autobind from 'autobind-decorator';
import IDeviceFactory from '../devices/interfaces/IDeviceFactory';
import IDeviceModel from '../model/interfaces/IDeviceModel';
import ArduinoThermostat from '../devices/ArduinoThermostat';

@sealed
@injectable()
export default class ThermostatBusiness extends BaseBusiness<IThermostatModel> implements IThermostatBusiness {
    
    constructor(@inject('IRepository<IThermostatModel>') repository: IRepository<IThermostatModel>,
        @inject('IDeviceFactory') private deviceFactory: IDeviceFactory,
        @inject('IBaseBusiness<IDeviceModel>') private deviceBusiness: IBaseBusiness<IDeviceModel>,
        @inject('IBaseBusiness<ITemperatureSensorDataModel>') private tempBusiness: IBaseBusiness<ITemperatureSensorDataModel>,
        @inject('IBaseBusiness<IZoneModel>') private zoneBusiness: IBaseBusiness<IZoneModel>) {
        super(repository);
    }

    private async thermostatDevice(): Promise<IThermostatDevice> {
        const devices = await this.deviceBusiness.retrieve({ limit: 1, condition: { type: 'Thermostat' } });
        if (devices.length === 0) {
            return Promise.resolve(new ArduinoThermostat());
        } else {
            return Promise.resolve(<IThermostatDevice>this.deviceFactory.create(devices[0]));
        }
    }

    public async getConfiguration(callback?: (error: any, result: any) => void): Promise<any> {
        return this.thermostatDevice().then( v => v.getCurrentConfiguration()
            .then(item => callback(null, item))
            .catch(item => callback(item, null)));
    }

    public async getStatus(callback?: (error: any, result: any) => void): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.thermostatDevice().then( v => v.getStatus()
                .then(thermostatResponse => {
                    const data = {
                        isOn: thermostatResponse.heater.status === 'ON',
                        temperature: thermostatResponse.zones[0].temp,
                        humidity: thermostatResponse.zones[0].hum,
                        mode: thermostatResponse.mode === 'Manual' ? ThermostatMode.Manual.toString() 
                        : ThermostatMode.Automatic.toString(),
                    };
                    resolve(data);
                    if (callback)
                        callback(null, data);
                }).catch(error => {
                    reject(error);
                    if (callback)
                        callback(error, null);
                }));
        });
    }


    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    public async setPower(power: boolean, callback?: (error: any, result: any) => void): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            this.thermostatDevice().then( v => v.setPower(power)
            .then(this.saveArduinoData)
            .then(thermostatResponse => {
                this.create(<IThermostatModel>{
                    isOn: thermostatResponse.heater.status === 'ON', 
                    mode: ThermostatMode.Manual.toString() })
                    .then(function (saveResult) {

                        const resp = {
                            isOn: saveResult.isOn,
                            mode: saveResult.mode,
                            temperature: thermostatResponse.zones[0].temp,
                            humidity: thermostatResponse.zones[0].hum,
                        };
                        resolve(resp);
                        if (callback)
                            callback(null, resp);
                    }).catch(error => {
                        reject(error);
                        if (callback)
                            callback(error, null);
                    });
            }).catch(error => {
                reject(error);
                if (callback)
                    callback(error, null);
            }));
        });
    }

    public async setMode(mode: ThermostatMode, callback?: (error: any, result: any) => void): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.thermostatDevice().then( v => v.setMode(mode)
            .then(this.saveArduinoData)
            .then(thermostatResponse => {
                this.create(<IThermostatModel>{ 
                    isOn: thermostatResponse.heater.status === 'ON', 
                    mode: mode.toString() })
                    .then(function (saveResult) {

                        const resp = {
                            isOn: saveResult.isOn,
                            mode: saveResult.mode,
                            temperature: thermostatResponse.zones[0].temp,
                            humidity: thermostatResponse.zones[0].hum,
                        };
                        resolve(resp);
                        if (callback)
                            callback(null, resp);
                    }).catch(error => {
                        reject(error);
                        if (callback)
                            callback(error, null);
                    });
            }).catch(error => {
                reject(error);
                if (callback)
                    callback(error, null);
            }));
        });
    }

    @autobind
    private saveArduinoData(response: IThermostatResponse): IThermostatResponse {
        if (response.zones) {
            response.zones.forEach(aZone => {
                this.zoneBusiness.findOne({ internalId: <number>aZone.id }).then(zone => {
                    if (zone) {
                        this.tempBusiness.create(<ITemperatureSensorDataModel>{
                            zone: zone._id,
                            temperature: <number>aZone.temp,
                            humidity: <number>aZone.hum,
                        });
                    }
                });
            });
        }
        return response;
    }
}
