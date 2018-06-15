import * as config from "app/model/interfaces/IThermostatConfig";

export default interface IThermostatBusiness {
    getConfiguration(): config.IThermostatConfig;
    setPower(power: boolean, callback: (error: any, result: boolean ) => void): void;
} 
