import IBaseBusiness from './base/IBaseBusiness';
import IDeviceModel from '../../model/interfaces/IDeviceModel';


export default interface IDeviceBusiness extends IBaseBusiness<IDeviceModel> {
    getDeviceData(name: String, query: any): Promise<any>;
    setDeviceData(name: String, data: any): Promise<any>;
} 
