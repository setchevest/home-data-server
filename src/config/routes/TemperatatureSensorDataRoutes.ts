import * as express from "express";
import TemperatureSensorDataController from "../../controllers/TemperatureSensorDataController";
import { sealed } from "../../core/Decorators";

var router = express.Router();
@sealed
export default class TemperatatureSensorDataRoutes {
    private _controller: TemperatureSensorDataController;
    
    constructor () {
        this._controller = new TemperatureSensorDataController();   
    }

    public get routes () {
        var controller = this._controller;
        router.get("/", controller.retrieve);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/byid/:_id", controller.findById);
        router.delete("/:_id", controller.delete);
        return router;
    }
}


