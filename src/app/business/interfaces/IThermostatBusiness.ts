import * as config from "app/model/interfaces/IThermostatConfig";
import IBaseBusiness from "./base/IBaseBusiness";
import IThermostatModel, { ThermostatMode } from "../../model/interfaces/IThermostatModel";


export default interface IThermostatBusiness extends IBaseBusiness<IThermostatModel> {
    getConfiguration(callback: (error: any, result: any) => void): void
    getStatus(callback: (error: any, result: IThermostatModel ) => void): void;
    setPower(power: boolean, callback: (error: any, result: boolean ) => void): void;
    setMode(mode: ThermostatMode, callback: (error: any, result: any) => void): void;
} 
