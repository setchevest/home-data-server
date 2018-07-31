export interface IMessageBroker {
    publish(event: string|symbol, data: IMessagePayload): IMessageBroker;
    subscribe(event: string|symbol, action: (payload: IMessagePayload) => void): IMessageBroker;
    subscribeOnce(event: string|symbol, action: (payload: IMessagePayload) => void): IMessageBroker;
    unsubscribe(event: string|symbol, action: (payload: IMessagePayload) => void): IMessageBroker;
}

export interface IMessagePayload {
    timestamp: Date;
    payload: any;
}