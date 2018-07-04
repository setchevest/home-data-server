import * as express from "express";
import ThermostatController from "../../controllers/ThermostatController";
import { sealed } from "../../core/Decorators";

var router = express.Router();
@sealed
export default class ThermostatRoutes {
    private _controller: ThermostatController;
    
    constructor () {
        this._controller = new ThermostatController();   
    }

    public get routes () {
        var controller = this._controller;
        router.get("/", controller.retrieve);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/byid/:_id", controller.findById);
        router.delete("/:_id", controller.delete);
        
        router.get("/status", controller.currentStatus);
        router.get("/config", controller.getConfiguration);
        router.post("/event", controller.postEvent);
        router.post("/turnOn", controller.turnOn);
        router.post("/turnOff", controller.turnOff);
        router.post("/setAutoMode", controller.setAutoMode);
        router.post("/setManualMode", controller.setManualMode);
        return router;
    }
}
