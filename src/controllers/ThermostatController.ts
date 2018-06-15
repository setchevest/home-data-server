import { Request, Response } from "express";
import HeaterStatusBusiness from "../app/business/HeaterStatusBusiness";
import ThermostatBusiness from "../app/business/ThermostatBusiness";
import { ThermostatMode } from "../app/model/ThermostatConfigModel";


export default class ThermostatController {

    public getConfiguration(req: Request, res: Response): void {
        res.send(new ThermostatBusiness(new HeaterStatusBusiness()).getConfiguration());
    }

    public currentStatus(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setPower(true, (error, result) => {
            res.send(error ? error : result);
        });

    }

    public turnOn(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setPower(true, (error, result) => {
            res.send(error ? error : result);
        });

    }

    public turnOff(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setPower(false, (error, result) => {
            res.send(error ? error : result);
        });
    }

    public setAutoMode(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setMode(ThermostatMode.Automatic, (error, result) => {
            res.send(error ? error : result);
        });
    }

    public setManualMode(req: Request, res: Response): void {
        new ThermostatBusiness(new HeaterStatusBusiness()).setMode(ThermostatMode.Manual, (error, result) => {
            res.send(error ? error : result);
        });
    }
}
