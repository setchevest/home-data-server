import * as mqtt from 'mqtt';
import { IMessageBroker, IMessagePayload, isMessagePayload, OnMessageCallback } from './intefaces/IMessageBroker';
import { injectable, inject } from 'inversify';
import { Types } from '../config/Types';
import { ILogger } from './intefaces/ILogger';

export interface IEventEmmiter {
    on(event: string | symbol, listener: (...args: any[]) => void): any;
    once(event: string | symbol, listener: (...args: any[]) => void): any;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
    emit(event: string | symbol, ...args: any[]): boolean;
}

@injectable()
export class MqttMessageBroker implements IMessageBroker {

    constructor(@inject(Types.ILogger) protected logger: ILogger) {

    }

    private static _id: number = 1;
    private static generateId(): number {
        return this._id++;
    }
    // docker run -it -p 1883:1883 -p 9001:9001 -v mosquitto.conf:/data/config/mosquitto.conf eclipse-mosquitto
    private client: mqtt.MqttClient;
    private clientId: number = MqttMessageBroker.generateId();

    protected createEmitter(): IEventEmmiter {
        if (!this.client) {

            this.client = mqtt.connect('mqtt://localhost:1883');

            this.client.once('connect', (topic, message) => {
                this.logger.debug(`${this.clientId} - Mqtt client connected.`, topic, message);
            });

            this.client.on('error', (topic, message) => {
                this.logger.error(`${this.clientId} - Mqtt client error.`, topic, message);
            });

            // this.client.on('packetsend', (topic, message) => {
            //     this.logger.debug(`${this.clientId} - Mqtt client pkt sent.`, topic, message);
            // });

            // this.client.on('packetreceive', (topic, message) => {
            //     this.logger.debug(`${this.clientId} - Mqtt client pkt received.`, topic, message);
            // });
        }
        return this.client;
    }

    private runAction(topics: string[], message: Buffer, action: OnMessageCallback) {
        let data: any = message.toString();
        let isBlob = true;
        try {
            data = JSON.parse(data);
        } catch (error) {
            isBlob = false;
        }

        if (!(isBlob && isMessagePayload(data)))
            data = <IMessagePayload>{
                timestamp: new Date(),
                payload: data,
            };
        
        try {
            action(topics, data);
        } catch (error) {
            this.logger.error(`${this.clientId} - Broker action error`, data, error);
        }
    }

    public publish(event: string, data: IMessagePayload): IMessageBroker {
        this.logger.debug(`${this.clientId} - Message ${event.toString()} emitted`);
        this.createEmitter();
        this.client.publish(event, JSON.stringify(data), <mqtt.IClientPublishOptions>{
            
        });
        return this;
    }

    public subscribe(event: string): IMessageBroker {
        this.createEmitter();
        this.client.subscribe(event, (err, granted) => {
            this.logSubscritionStatus(event, err, granted);
        });
        return this;
    }

    private logSubscritionStatus(event: string, err: Error, granted: mqtt.ISubscriptionGrant[]) {
        if (err) {
            this.logger.debug(`${this.clientId} - Subscription error to ${event.toString()}`, err);
        } else {
            this.logger.debug(`${this.clientId} - Subscription successful to ${event.toString()}`, granted);
        }
    }

    public unsubscribe(event: string): IMessageBroker {
        this.createEmitter();
        this.client.unsubscribe(event);
        return this;
    }

    public onAny(action: OnMessageCallback): IMessageBroker {
        this.createEmitter();
        this.client.on('message', (topic, message) => {
            this.runAction([topic], message, action);
        });
        return this;
    }
    public on(event: RegExp | string, action: OnMessageCallback): IMessageBroker {
        this.createEmitter();
        this.client.on('message', (topic, message) => {
            const matches = topic.match(event);
            if (matches) {
                const asd = matches.map(s => s.toString());

                this.runAction(asd, message, action);
            }
        });
        return this;
    }
}