import * as express from "express";
import HeaterStatusController from "../../controllers/HeaterStatusController";

var router = express.Router();
export default class HeaterStatusRoutes {
    private _controller: HeaterStatusController;
    
    constructor () {
        this._controller = new HeaterStatusController();   
    }

    public get routes () {
        var controller = this._controller;
        router.get("/", controller.retrieve);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/byid/:_id", controller.findById);
        router.delete("/:_id", controller.delete);
        router.post("/setHeaterMode", controller.setHeaterMode);
        router.get("/getCurrentStatus", controller.getCurrentStatus);
        return router;
    }
}

Object.seal(HeaterStatusRoutes);
