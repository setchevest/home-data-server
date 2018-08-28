import IProcess from '../core/intefaces/IProcess';
import { injectable, inject } from 'inversify';
import { Types } from '../config/Types';
import { IMessageBroker } from '../core/intefaces/IMessageBroker';
import { VirtualArduinoThermostat } from './app/devices/VirtualArduinoThermostat';

@injectable()
export default class VirtualDeviceLauncher implements IProcess {
    
    public identifier: string | Symbol = 'Virtual Device Launcher';

    private devices: VirtualArduinoThermostat[] = [];
    
    constructor(@inject(Types.IMessageBroker) private broker: IMessageBroker) {
        this.devices.push(new VirtualArduinoThermostat('Virtual Arduino Thermostat'));
    }

    public start(): Promise<boolean> {
        this.broker.subscribe('virtualDevice/in/#');
        this.broker.on('virtualDevice/in/init', (topics, message) => {
            this.devices.forEach(d => {
                d.init();
            });
        });
        this.broker.on('virtualDevice/in/stop', (topics, message) => {
            this.devices.forEach(d => {
                d.stop();
            });
        });
        return Promise.resolve(true);
    }

    public stop(): Promise<boolean> {
        this.broker.unsubscribe('virtualDevice/in/#');
        return Promise.resolve(true);
    }
}