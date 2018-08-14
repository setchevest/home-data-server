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
import IRegistry from '../../core/intefaces/IRegistry';
import IDevice from '../devices/interfaces/IDevice';
import { Types } from '../../config/Types';
import IAppConfig from '../../config/IAppConfig';

@sealed
@injectable()
export default class ThermostatBusiness extends BaseBusiness<IThermostatModel> implements IThermostatBusiness {
    
    constructor(@inject(Types.IRepository_IThermostatModel) repository: IRepository<IThermostatModel>,
        @inject(Types.IAppConfig) private appConfig: IAppConfig,
        @inject(Types.IRegistry_String_IDevice) private deviceRegistry: IRegistry<String, IDevice>,
        @inject(Types.IBaseBusiness_ITemperatureSensorDataModel) private tempBusiness: IBaseBusiness<ITemperatureSensorDataModel>,
        @inject(Types.IBaseBusiness_IZoneModel) private zoneBusiness: IBaseBusiness<IZoneModel>) {
        super(repository);
    }

    private device(): IThermostatDevice {
        // TODO: Remove harcoded name. Is fucking awful.
        const thermostat = <IThermostatDevice>this.deviceRegistry.get(this.appConfig.THERMOSTAT);
        if (!thermostat)
            throw new Error('No Thermostat device configured');
            
        return thermostat;
    }

    public async getConfiguration(callback?: (error: any, result: any) => void): Promise<any> {
        return this.device().getConfig()
            .then(item => callback(null, item))
            .catch(item => callback(item, null));
    }

    public async getStatus(callback?: (error: any, result: any) => void): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.device().getStatus()
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
                });
        });
    }


    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}
    public async setPower(power: boolean, callback?: (error: any, result: any) => void): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            this.device().setPower(power)
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
            });
        });
    }

    public async setMode(mode: ThermostatMode, callback?: (error: any, result: any) => void): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.device().setMode(mode)
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
            });
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
