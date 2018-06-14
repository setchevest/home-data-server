import * as express from "express";
import ThermostatController from "../../controllers/ThermostatController";

var router = express.Router();
export default class ThermostatRoutes {
    private _controller: ThermostatController;
    
    constructor () {
        this._controller = new ThermostatController();   
    }

    public get routes () {
        var controller = this._controller;
        router.get("/config", controller.getConfiguration);
        router.post("/turnOn", controller.turnOn);
        router.post("/turnOff", controller.turnOff);
        router.post("/setAutoMode", controller.setAutoMode);
        router.post("/setManualMode", controller.setManualMode);
        return router;
    }
}

Object.seal(ThermostatRoutes);
