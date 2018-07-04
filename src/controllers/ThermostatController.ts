import { Request, Response } from "express";
import IThermostatModel, { ThermostatMode } from "../app/model/interfaces/IThermostatModel";
import ThermostatBusiness from "../app/business/ThermostatBusiness";
import BaseController from "./base/BaseController";
import  apiController from "../core/Decorators/apiController"
import autobind from "autobind-decorator";
import { ArduinoThermostat } from "../app/devices/ArduinoThermostat";

@apiController("/api/thermostat")
@autobind
export default class ThermostatController extends BaseController<IThermostatModel> {
    
    constructor() {
        super(new ThermostatBusiness(new ArduinoThermostat()));
    }

    public getConfiguration(req: Request, res: Response): void {
        (<ThermostatBusiness>this.business).getConfiguration((error, result)=>{
            res.send(error ? error : result);
        })
    }

    public setHeaterMode(req: Request, res: Response): void {
        this.processRequest(req, res, () => {
            var entity: IThermostatModel = <IThermostatModel>req.body;
            res.send({ data: entity });
        })
    }
    
    public currentStatus(req: Request, res: Response): void {
        (<ThermostatBusiness>this.business).getStatus((error, result) => {
            res.send(error ? error : result);
        });

    }

    public turnOn(req: Request, res: Response): void {
        (<ThermostatBusiness>this.business).setPower(true, (error, result) => {
            res.send(error ? error : result);
        });

    }

    public postEvent(req: Request, res: Response): void {
        // this.business.setPower(true, (error, result) => {
        //     res.send(error ? error : result);
        // });
        console.log(req.body);
        res.send({ no: "thing" });
    }

    public turnOff(req: Request, res: Response): void {
        (<ThermostatBusiness>this.business).setPower(false, (error, result) => {
            res.send(error ? error : result);
        });
    }

    public setAutoMode(req: Request, res: Response): void {
        (<ThermostatBusiness>this.business).setMode(ThermostatMode.Automatic, (error, result) => {
            res.send(error ? error : result);
        });
    }

    public setManualMode(req: Request, res: Response): void {
        (<ThermostatBusiness>this.business).setMode(ThermostatMode.Manual, (error, result) => {
            res.send(error ? error : result);
        });
    }
}
