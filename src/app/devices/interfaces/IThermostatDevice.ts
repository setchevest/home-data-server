import IDevice from "./IDevice"
import { IThermostatConfig, IThermostatResponse } from "../../model/interfaces/IThermostatConfig";
import { ThermostatMode } from "../../model/interfaces/IThermostatModel";

export default interface IThermostatDevice extends IDevice
{
    getCurrentConfiguration(): Promise<IThermostatConfig>;
    getStatus() : Promise<IThermostatResponse>;
    setPower(power: boolean) : Promise<IThermostatResponse>;
    setMode(mode: ThermostatMode): Promise<IThermostatResponse>;
}