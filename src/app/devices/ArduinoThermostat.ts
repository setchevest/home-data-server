import { IThermostatConfig, IThermostatResponse } from '../model/interfaces/IThermostatConfig';
import IThermostatDevice from './interfaces/IThermostatDevice';
import axios, { AxiosPromise } from 'axios';
import { ThermostatMode } from '../model/interfaces/IThermostatModel';
import logger from '../../core/Logger';
import { injectable } from 'inversify';

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

    private config: {
        url: string,
        data: IThermostatConfig,
    };
    /**
     *
     */
    constructor() {

    }
    get name(): string {
        return 'Arduino Thermostat';
    }

    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}

    public getCurrentConfiguration(): Promise<IThermostatConfig> {
        return new Promise<IThermostatConfig>(function (resolve, reject) {
            resolve(this.config.data);
        });
    }

    public setConfig(config: Map<string, any>): Promise<boolean> {
        this.config = {
            url: config.get('url'),
            data: config.get('data'),
        };
        if (!this.config.url)
            return Promise.reject('Missing configuration: Key "url"');

        return Promise.resolve(true);
    }

    public setData(data: any): Promise<any> {
        if (data && data.power) {
            return this.setPower(data.power);
        } else if (data && data.mode) {
            return this.setMode(data.mode);
        }
        return Promise.resolve();
    }

    public getData(data: any): Promise<any> {
        if (data && data.config) {
            return this.getCurrentConfiguration();
        }
        return this.getStatus();
    }

    public getStatus(): Promise<IThermostatResponse> {
        return this.axiosromiseWrapper<IThermostatResponse>(axios.get(this.config.url));
    }

    public setPower(power: boolean): Promise<IThermostatResponse> {
        const url = this.config.url + (power ? '/on' : '/off');
        return this.axiosromiseWrapper<IThermostatResponse>(axios.get(url));
    }

    public setMode(mode: ThermostatMode): Promise<IThermostatResponse> {
        const url = mode === ThermostatMode.Manual ? '/manual' : '/auto';
        return this.axiosromiseWrapper<IThermostatResponse>(axios.get(this.config.url + url));
    }

    axiosromiseWrapper<T>(axiosPromise: AxiosPromise): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            axiosPromise
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        logger.error('The request was made and the server responded with an unexpected status code.', error.response);
                        reject({
                            status: error.response.status,
                            message: error.response.data,
                        });
                    } else if (error.request) {
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
