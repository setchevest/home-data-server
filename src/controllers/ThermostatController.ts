import { Request, Response } from "express";
import HeaterStatusBusiness from "../app/business/HeaterStatusBusiness";
import ThermostatBusiness from "../app/business/ThermostatBusiness";
import { ThermostatMode } from "../app/model/ThermostatConfigModel";


export default class ThermostatController {

    public getConfiguration(req: Request, res: Response): void {
        res.send(new ThermostatBusiness(new HeaterStatusBusiness()).getConfiguration());
    }

    public turnOn(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).turnOn((error, result)=>{
            res.send(result);
        });
        
    }

    public turnOff(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).turnOff((error, result)=>{
            res.send(result);
        });
    }

    public setAutoMode(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setMode(ThermostatMode.Automatic, (error, result)=>{
            res.send(result);
        });
    }

    public setManualMode(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setMode(ThermostatMode.Manual, (error, result)=>{
            res.send(result);
        });
    }
}
