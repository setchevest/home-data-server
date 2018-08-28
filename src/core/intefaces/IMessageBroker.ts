export declare type OnMessageCallback = (events: Array<string>, payload: IMessagePayload) => void;

export interface IMessageBroker {
    publish(event: string, data: IMessagePayload): IMessageBroker;
    subscribe(event: string): IMessageBroker;
    unsubscribe(event: string): IMessageBroker;
    onAny(action: OnMessageCallback): IMessageBroker;
    on(event: RegExp | string, action: OnMessageCallback): IMessageBroker;
}

export interface IMessagePayload {
    timestamp: Date;
    payload: string | Object;
}

export function isMessagePayload(obj: any): obj is IMessagePayload {
    return (<IMessagePayload>obj).timestamp !== undefined;
}