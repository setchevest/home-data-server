import * as express from "express";
import HeroRoutes from "./../HeroRoutes";

var app = express();
export default class BaseRoutes {
    get routes() {
        app.use("/heroes", new HeroRoutes().routes);
        return app;
    }
}