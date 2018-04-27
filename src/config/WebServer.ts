import AppConfig from "./appConfig"
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as mongoose from "mongoose";
import BaseRoutes from "./routes/base/BaseRoutes";
import DataAccess from "../app/dataAccess/DataAccess";

class WebServer {

    public app: express.Express;
    /*--------  Constructor  --------*/

    constructor() {
        // Start App
        this.app = express();

        this.connectToDatabase();
        // Set view engine
        this.setViewEngine();
        // Middleware
        this.setMiddleware();
        // Set static files
        this.setStaticFiles();
        // Routes
        this.setRoutes();
    }


    /*--------  Methods  --------*/


    /**
     * Connect to mongo
     */
    private connectToDatabase() {
        DataAccess.connect();
    }

    /**
     * Set view engine
     */
    private setViewEngine() {
        // Configure ejs as view engine
        this.app.set("views", path.join(__dirname, "../../src/views"));
        this.app.set("view engine", "ejs");
    }

    /**
     * Set middleware
     */
    private setMiddleware() {
        // Add logging
        this.app.use(logger(AppConfig.Instance.LogLevel));
        // Add body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Add cookie parser
        this.app.use(cookieParser());

    }

    /**
     * Set static files
     */
    private setStaticFiles() {
        // Set static route for public folder
        let staticFolferPath = path.join(__dirname, "../public");
        this.app.use(express.static(staticFolferPath));
    }

    /**
     * Set routes
     */
    private setRoutes() {
        // Create Routes, and export its configured Express.Router
        this.app.use(new BaseRoutes().routes);
    }
}

export default new WebServer().app;