import IDevice from '../interfaces/IDevice';
import IInputDevice from '../interfaces/IInputDevice';

export default abstract class BaseDevice implements IDevice, IInputDevice {

    public discriminator: 'InputDevice';

    constructor(protected deviceName: string) {

    }

    public name(): string {
        return this.deviceName;
    }

    public setConfig(config: Map<string, any>): Promise<boolean> {
        return Promise.resolve(false);
    }

    public getData(query: Object): Promise<any> {
        const promises: Array<Promise<any>> = [];
        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                const fn = this[this.resolveGetKey(key)];
                if (fn instanceof Function)
                    promises.push(fn.call(this, query[key]));
            }
        }
        return Promise.all(promises);
    }

    public setData(data: Object): Promise<any> {
        const promises: Array<Promise<any>> = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const fn = this[this.resolveSetKey(key)];
                if (fn instanceof Function)
                    promises.push(fn.call(this, data[key]));
            }
        }
        return Promise.all(promises);
    }

    resolveSetKey(key: string): string {
        return 'set' + key[0].toLocaleUpperCase() + key.substr(1);
    }
    resolveGetKey(key: string): string {
        return 'get' + key[0].toLocaleUpperCase() + key.substr(1);
    }
}