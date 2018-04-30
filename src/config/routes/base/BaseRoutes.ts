import * as express from "express";
import HeroRoutes from "./../HeroRoutes";
import HeaterStatusRoutes from "../HeaterStatusRoutes";

var app = express();
export default class BaseRoutes {
    get routes() {
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });          
        app.use("/api/heroes", new HeroRoutes().routes);
        app.use("/api/heaterstatus", new HeaterStatusRoutes().routes);
        return app;
    }
}