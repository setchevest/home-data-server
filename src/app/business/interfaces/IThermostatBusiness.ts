import IBaseBusiness from "./base/IBaseBusiness";
import IHeaterStatusModel from "./../../model/interfaces/IHeaterStatusModel";
import * as config from "app/model/interfaces/IThermostatConfig";

export default interface IThermostatBusiness {
    getConfiguration(): config.IThermostatConfig;
    turnOn(callback: (error: any, result: boolean ) => void): void;
    turnOff(callback: (error: any, result: boolean ) => void): void;
} 
