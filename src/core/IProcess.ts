import { EventEmitter } from 'events';

export default interface IProcess {
    identifier: string | Symbol ;
    start(events: EventEmitter): Promise<boolean>;
    stop(): Promise<boolean>;
}
