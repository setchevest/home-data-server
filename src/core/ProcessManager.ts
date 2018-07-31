import IProcess from './intefaces/IProcess';
import logger from './Logger';
import { EventEmitter } from 'events';
import autobind from 'autobind-decorator';
import { IMessageBroker, IMessagePayload } from './intefaces/IMessageBroker';
import { injectable } from 'inversify';

@injectable()
export default class ProcessManager implements IMessageBroker {

    private processes: IProcess[] = [];
    private eventEmitter: EventEmitter;

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    public add(process: IProcess): ProcessManager {
        this.processes.push(process);
        return this;
    }

    public runAll(): ProcessManager {
        this.processes.forEach(this.run);
        return this;
    }

    @autobind
    private run(process: IProcess) {
        try {
            logger.info('Starting Process: ', process.identifier);
            process.start();
        } catch (error) {
            logger.error('Error starting process: ', process, error.message);
        }
    }

    public publish(event: string | symbol, data: IMessagePayload): IMessageBroker {
        logger.debug(`Message ${event.toString()} emitted`);
        this.eventEmitter.emit(event, data);
        return this;
    }

    public subscribe(event: string | symbol, action: (payload: IMessagePayload) => void): IMessageBroker {
        this.eventEmitter.on(event, action);
        return this;
    }

    public subscribeOnce(event: string | symbol, action: (payload: IMessagePayload) => void): IMessageBroker {
        this.eventEmitter.once(event, action);
        return this;
    }

    public unsubscribe(event: string | symbol, action: (payload: IMessagePayload) => void): IMessageBroker {
        this.eventEmitter.removeListener(event, action);
        return this;
    }
}


