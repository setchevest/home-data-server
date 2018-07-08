import { Request, Response } from "express";
import IThermostatModel, { ThermostatMode } from "../app/model/interfaces/IThermostatModel";
import ThermostatBusiness from "../app/business/ThermostatBusiness";
import BaseController from "./base/BaseController";
import autobind from "autobind-decorator";
import ArduinoThermostat from "../app/devices/ArduinoThermostat";
import logger from "../core/Logger";
import ThermostatRepository from "../app/repository/ThermostatRepository";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import IBaseBusiness from "../app/business/interfaces/base/IBaseBusiness";
import { inject } from "inversify";

@autobind
@controller("/api/thermostat")
export default class ThermostatController extends BaseController<IThermostatModel> {
    
    /**
     *
     */
    constructor(@inject("IBaseBusiness<IThermostatModel>") business: IBaseBusiness<IThermostatModel>) {
        super(business);
        
    }

    @httpGet("/config")
    public getConfiguration(): Promise<any> {
         return this.processRequest((<ThermostatBusiness>this.business).getConfiguration())
    }
    
    @httpGet("/status")
    public currentStatus(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).getStatus());

    }

    @httpPost("/event")
    public postEvent(): Promise<any> {
        //logger.debug(req.body);
        // res.send({ no: "thing" });
        return null;
    }

    @httpPost("/turnon")
    public turnOn(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setPower(true));

    }

    @httpPost("/turnoff")
    public turnOff(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setPower(false));
    }

    @httpPost("/setautomode")
    public setAutoMode(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setMode(ThermostatMode.Automatic));
    }

    @httpPost("/setamanualmode")
    public setManualMode(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setMode(ThermostatMode.Manual));
    }
}
