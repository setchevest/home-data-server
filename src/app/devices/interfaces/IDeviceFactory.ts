import IDeviceModel from '../../model/interfaces/IDeviceModel';
import IDevice from './IDevice';

export default interface IDeviceFactory {
    createAsync(mode: IDeviceModel): Promise<IDevice>;
    create(mode: IDeviceModel): IDevice;
}