import * as express from "express";
// import HeroRoutes from "./../HeroRoutes";
import ThermostatRoutes from "../ThermostatRoutes";
import TemperatatureSensorDataRoutes from "../TemperatatureSensorDataRoutes";
import ZonesRoutes from "../Zoneroutes";

var app = express();
export default class BaseRoutes {
    static get routes() {
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });          
        // app.use("/api/heroes", new HeroRoutes().routes);
        app.use("/api/thermostat", new ThermostatRoutes().routes);
        app.use("/api/zone", new ZonesRoutes().routes);
        app.use("/api/temperaturesensordata", new TemperatatureSensorDataRoutes().routes);
        return app;
    }
}