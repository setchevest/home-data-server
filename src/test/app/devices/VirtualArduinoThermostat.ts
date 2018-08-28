import { IThermostatConfig } from '../../../app/model/interfaces/IThermostatConfig';
import { Types } from '../../../config/Types';
import { IMessageBroker } from '../../../core/intefaces/IMessageBroker';
import { Events } from '../../../app/business/Events';
import container from '../../../config/Inversify.config';

export class VirtualArduinoThermostat {
    private config: {
        topic: string;
        data: IThermostatConfig;
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
                temp: 28,
                hum: 41,
            },
        ],
    };
    protected timer: NodeJS.Timer;
    /**
     *
     */
    constructor(protected name: string) {
    }

    private broker: IMessageBroker = container.get(Types.IMessageBroker);

    private topicIn: string;

    public init(): void {
        this.topicIn = Events.Device.outgoing.use(this.name).all;
        this.publishInitData();
        this.broker.unsubscribe(this.topicIn);
        this.broker.subscribe(this.topicIn);
        this.broker.on(Events.Device.outgoing.use(this.name).asRegExp().all, (topics, payload) => {
            if (topics.length > 1) {
                switch (topics[1]) {
                    case 'switch_on':
                        this.data.heater.on(true);
                        this.publishChanges();
                        break;
                    case 'switch_off':
                        this.data.heater.on(false);
                        this.publishChanges();
                        break;
                    default:
                        this.publishChanges();
                        break;
                }
            }
        });
        this.stop();
        this.timer = setInterval(() => {
            this.data.fm++;
            this.data.mode = 'Fun' + this.data.fm;
            this.publishChanges();
        }, 10000);
    }

    public stop() {
        clearTimeout(this.timer);
    }

    private publishInitData() {
        this.broker.publish(Events.Device.incomming.use(this.name).init, {
            timestamp: new Date(),
            payload: {
                id: this.name,
                type: 'mqtt',
                topic: this.topicIn,
                features: [{
                    type: 'switch',
                    actions: ['on', 'off'],
                    value: this.data.heater.status,
                }, {
                    type: 'temperature',
                    actions: ['val'],
                    value: this.data.zones[0].temp,
                }, {
                    type: 'humidity',
                    actions: ['val'],
                    value: this.data.zones[0].hum,
                }],
            },
        });
    }

    private publishChanges() {
        this.broker.publish(Events.Device.incomming.use(this.name).status, {
            timestamp: new Date(),
            payload: this.data,
        });
    }

    private setConfig(config: Map<string, any>): Promise<boolean> {
        this.config = {
            topic: config.get('topic'),
            data: config.get('data'),
        };
        if (!this.config.topic)
            return Promise.reject('Missing configuration: Key "topic"');
        return Promise.resolve(true);
    }
}
