import { IThermostatConfig, IThermostatResponse } from '../model/interfaces/IThermostatConfig';
import IThermostatDevice from './interfaces/IThermostatDevice';
import { ThermostatMode } from '../model/interfaces/IThermostatModel';
import { injectable } from 'inversify';
import autobind from 'autobind-decorator';


@injectable()
@autobind
export default class FakeArduinoThermostat implements IThermostatDevice {

    private config: {
        url: string,
        data: IThermostatConfig,
    };

    private data = {
        fm: 224,
        lu: 55,
        mode: 'Manual',
        heater: {
            status: 'ON',
            on: function (value: boolean) {
                this.status = value ? 'ON' : 'OFF';
            },
        },
        zones: [
            {
                id: 2,
                temp: 27,
                hum: 41,
            }],
    };
    /**
     *
     */
    constructor() {
    }

    public discriminator: 'InputDevice';

    get name(): string {
        return 'Thermostat';
    }

    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}

    public getCurrentConfiguration(): Promise<IThermostatConfig> {
        return Promise.resolve(this.config.data);
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
        return Promise.resolve(this.data);
    }

    public setPower(power: boolean): Promise<IThermostatResponse> {
        this.data.heater.on(power);
        return Promise.resolve(this.data);
    }

    public setMode(mode: ThermostatMode): Promise<IThermostatResponse> {
        return Promise.resolve(this.data);
    }
}
