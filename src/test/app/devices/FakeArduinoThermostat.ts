import { IThermostatConfig, IThermostatResponse } from '../../../app/model/interfaces/IThermostatConfig';
import IThermostatDevice from '../../../app/devices/interfaces/IThermostatDevice';
import { ThermostatMode } from '../../../app/model/interfaces/IThermostatModel';
import { injectable, inject } from 'inversify';
import autobind from 'autobind-decorator';
import BaseDevice from '../../../app/devices/base/BaseDevice';


@injectable()
@autobind
export default class FakeArduinoThermostat extends BaseDevice implements IThermostatDevice {

    private config: {
        topic: string,
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

    // {"fm":224,"lu":55,"mode":"Manual","heater":{"status":"OFF"},"zones":[{"id":2,"temp":27,"hum":41}]}

    public getConfig(): Promise<IThermostatConfig> {
        return Promise.resolve(this.config.data);
    }

    public setConfig(config: Map<string, any>): Promise<boolean> {
        super.setConfig(config);
        this.config = {
            topic: config.get('url'),
            data: config.get('data'),
        };
        if (!this.config.topic)
            return Promise.reject('Missing configuration: Key "url"');

        return Promise.resolve(true);
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


