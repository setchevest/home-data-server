import BaseDevice from '../base/BaseDevice';
import IDevice from './IDevice';

export default interface IBaseDeviceConstructor {
    new(): BaseDevice;
}