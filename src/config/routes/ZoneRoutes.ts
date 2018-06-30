import * as express from "express";
import ZoneController from "../../controllers/ZoneController";
import { sealed } from "../../core/Decorators";
var router = express.Router();

@sealed
export default class ZonesRoutes {
    private _controller: ZoneController;
    
    constructor () {
        this._controller = new ZoneController();   
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
