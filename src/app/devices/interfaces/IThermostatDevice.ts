import IDevice from './IDevice';
import { IThermostatConfig, IThermostatResponse } from '../../model/interfaces/IThermostatConfig';
import { ThermostatMode } from '../../model/interfaces/IThermostatModel';
import IInputDevice from './IInputDevice';

export default interface IThermostatDevice extends IDevice, IInputDevice {
    getCurrentConfiguration(): Promise<IThermostatConfig>;
    getStatus(): Promise<IThermostatResponse>;
    setPower(power: boolean): Promise<IThermostatResponse>;
    setMode(mode: ThermostatMode): Promise<IThermostatResponse>;
}
