import * as express from "express";
import HeroRoutes from "./../HeroRoutes";
import HeaterStatusRoutes from "../HeaterStatusRoutes";

var app = express();
export default class BaseRoutes {
    get routes() {
        app.use("/heroes", new HeroRoutes().routes);
        app.use("/heaterstatus", new HeaterStatusRoutes().routes);
        return app;
    }
}