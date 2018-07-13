import { IThermostatConfig, IThermostatResponse } from '../model/interfaces/IThermostatConfig';
import IThermostatDevice from './interfaces/IThermostatDevice';
import axios, { AxiosPromise } from 'axios';
import { ThermostatMode } from '../model/interfaces/IThermostatModel';
import logger from '../../core/Logger';
import { injectable, inject } from 'inversify';
import IAppConfig from '../../config/IAppConfig';

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request)
//     return request
//   });

//   axios.interceptors.response.use(request => {
//     console.log('Starting Response', request)
//     return request
//   });


@injectable()
export default class ArduinoThermostat implements IThermostatDevice {
    
    /**
     *
     */
    constructor(@inject('IAppConfig') private appConfig: IAppConfig) {
        
    }
    get name(): string {
        return 'Arduino Thermostat';
    }
    
    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}

    public getCurrentConfiguration(): Promise<IThermostatConfig> {
        return  new Promise<IThermostatConfig>(function(resolve, reject) {
            resolve(<IThermostatConfig>{
                updateFrequency: 6000,
                heaterPin: 8,
                zones: [
                    { zoneId: 1, name: 'Cocina' }],
                threshold: {
                    min: 19,
                    max: 21,
                    controlZoneId: 1,
                },
            });
        });
    }

    public getStatus(): Promise<IThermostatResponse> {
        return this.axiosromiseWrapper<IThermostatResponse>(axios.get(this.appConfig.THERMOSTAT_URL));
    }

    public setPower(power: boolean): Promise<IThermostatResponse> {
        const url = this.appConfig.THERMOSTAT_URL + (power ? '/on' : '/off');
        return this.axiosromiseWrapper<IThermostatResponse>(axios.get(url));
    }

    public setMode(mode: ThermostatMode): Promise<IThermostatResponse> {
        const url = mode === ThermostatMode.Manual ? '/manual' : '/auto';
        return this.axiosromiseWrapper<IThermostatResponse>(axios.get(this.appConfig.THERMOSTAT_URL + url));
    }

    axiosromiseWrapper<T>(axiosPromise: AxiosPromise): Promise<T> {
        return new Promise<T>((resolve, reject) => {
          axiosPromise
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                reject({
                  status: error.response.status,
                  message: error.response.data,
                });
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                logger.error('The request was made but no response was received', error.request);
                reject({
                  status: 444,
                  message: 'The request was made but no response was received',
                });
              } else {
                // Something happened in setting up the request that triggered an Error
                logger.error('Something happened in setting up the request that triggered an Error', error.message);
                reject({
                  status: 417,
                  message: 'Something happened in setting up the request that triggered an Error',
                });
              }
              // console.log(error.config);
            });
        });
      }
}
