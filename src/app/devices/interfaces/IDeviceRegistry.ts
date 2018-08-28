import IRegistry from '../../../core/intefaces/IRegistry';
import IDevice from './IDevice';

export default interface IDeviceRegistry extends IRegistry<string, IDevice>  {
    
}