import logger from '../Logger';
import container from '../../config/inversify.config';
import { IMessageBroker, IMessagePayload } from '../intefaces/IMessageBroker';

export function message(broker: string | symbol, eventName: string | symbol, data?: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function () {
            const result = method.apply(this, arguments);
            try {
                container.get<IMessageBroker>(broker).publish(eventName, <IMessagePayload>{
                    timestamp: new Date(),
                    payload: data || result,
                });    
            } catch (error) {
                logger.warning(`Message not sent: "${String(eventName)}". Error`, error.message || error);
            }
            return result;
        };
    };
}

export function asyncMessage(broker: string | symbol, eventName: string | symbol, data?: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = function () {
            return method.apply(this, arguments).then(result => {
                try {
                    container.get<IMessageBroker>(broker).publish(eventName, <IMessagePayload>{
                        timestamp: new Date(),
                        payload: data || result,
                    });    
                } catch (error) {
                    logger.warning(`Message not sent: "${String(eventName)}". Error`, error.message || error);
                }
                return result;
            });
        };
    };
}