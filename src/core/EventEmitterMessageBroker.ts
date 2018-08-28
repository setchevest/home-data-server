// import { EventEmitter } from 'events';
// import { IMessageBroker, IMessagePayload, isMessagePayload } from './intefaces/IMessageBroker';
// import { inject, injectable } from '../../node_modules/inversify';
// import { ILogger } from './intefaces/ILogger';
// import { Types } from '../config/Types';


// export interface IEventEmmiter {
//     on(event: string | symbol, listener: (...args: any[]) => void): any;
//     once(event: string | symbol, listener: (...args: any[]) => void): any;
//     removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
//     emit(event: string | symbol, ...args: any[]): boolean;
// }

// @injectable()
// export class EventEmitterMessageBroker implements IMessageBroker {

//     private _eventEmitter: IEventEmmiter;

//     protected get eventEmitter() {
//         if (!this._eventEmitter)
//             this._eventEmitter = this.createEmitter();

//         return this._eventEmitter;
//     }

//     constructor(@inject(Types.ILogger) protected logger: ILogger) {

//     }

//     protected createEmitter(): IEventEmmiter {
//         return new EventEmitter();
//     }

//     public publish(event: string | symbol, data: IMessagePayload): IMessageBroker {
//         this.logger.debug(`Message ${event.toString()} emitted`);
//         this.eventEmitter.emit(event, data);
//         return this;
//     }

//     public subscribe(event: string | symbol, action: (payload: IMessagePayload) => void): IMessageBroker {
//         this.eventEmitter.on(event, action);
//         return this;
//     }

//     public subscribeOnce(event: string | symbol, action: (payload: IMessagePayload) => void): IMessageBroker {
//         this.eventEmitter.once(event, action);
//         return this;
//     }

//     public unsubscribe(event: string | symbol, action: (payload: IMessagePayload) => void): IMessageBroker {
//         this.eventEmitter.removeListener(event, action);
//         return this;
//     }
// }
