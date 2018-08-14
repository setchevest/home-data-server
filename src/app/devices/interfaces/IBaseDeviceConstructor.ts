import BaseDevice from '../base/BaseDevice';

export default interface IBaseDeviceConstructor {
    new(name: string): BaseDevice;
}