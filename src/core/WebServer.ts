import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import IAppConfig from '../config/IAppConfig';
import IProcess from './intefaces/IProcess';
import autobind from 'autobind-decorator';
import logger from './Logger';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from '../config/inversify.config';
import '../controllers/TemperatureSensorDataController';
import '../controllers/ZoneController';
import '../controllers/ThermostatController';
import '../controllers/TaskController';
import '../controllers/TimeTriggerController';
import '../controllers/FunctionActionController';
import '../controllers/HttpActionController';
import '../controllers/ActionController';
import '../controllers/DeviceController';
import { injectable, inject } from 'inversify';
import { exists } from 'fs';
import { Types } from '../config/Types';

@injectable()
export default class WebServer implements IProcess {
    

    get identifier(): string | Symbol {
        return 'WebServer';
    }

    private server: InversifyExpressServer;
    private httpServer: http.Server;
    private _app: express.Application;
    public get app(): express.Application {
        return this._app;
    }
    public set app(value: express.Application) {
        this._app = value;
    }
    private port: number | string | boolean;
    /*--------  Constructor  --------*/

    constructor(@inject(Types.IAppConfig) private appConfig: IAppConfig) {
        
        // Start App
        this.port = this.normalizePort(this.appConfig.PORT);
        this.server = new InversifyExpressServer(container);
        this.app = this.server
            .setConfig(app => {
                app.use(this.setCorsAndVerbs);

                this.setViewEngine(app);
                // Middleware
                this.setMiddleware(app);
                // Set static files
                this.setStaticFiles(app);
                // Routes
                // this.setRoutes(app);
            }).setErrorConfig(app =>
                app.use((err, req, res, next) => {
                    logger.error('Web server error', err.message || err);
                    res.status(500).send({ error: 'Internal server error. Please contact your administrator.', errorDetails: err.message || err });
                })).build();
    }

    private setCorsAndVerbs(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
    }

    // private configureNodeRed(app: express.Application) {
    //     const node_red_settings = {
    //         httpAdminRoot: '/red',
    //         httpNodeRoot: '/redapi',
    //         // userDir: '/home/nol/.nodered/',
    //         functionGlobalContext: { },    // enables global context
    //     };
    //     RED.init(app, node_red_settings);
    //     app.use(node_red_settings.httpAdminRoot, RED.httpAdmin);
    //     // Serve the http nodes UI from /api
    //     app.use(node_red_settings.httpNodeRoot, RED.httpNode);
    // }

    @autobind
    public start(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.httpServer = this.app.listen(this.port, () => {
                resolve(true);
            }).on('close', this.onClose)
                .on('error', this.onError)
                .on('listening', this.onListening);
        });
    }

    @autobind
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            // this.app.(() => {
            //     resolve(true);
            // })

            resolve(true);
        });
    }

    /**
     * Set view engine
     */
    private setViewEngine(app: express.Application) {
        // Configure ejs as view engine
        app.set('views', path.join(__dirname, '../../src/views'));
        app.set('view engine', 'ejs');
    }

    /**
     * Set middleware
     */
    private setMiddleware(app: express.Application) {
        // Add logging

        app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console({
                    handleExceptions: true,
                }),
            ],
            winstonInstance: logger,
            meta: false, // optional: control whether you want to log the meta data about the request (default to true)
            msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} - {{res.responseTime}}ms',
            // optional: customize the default logging message. 
            // E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: false,
            // Use the default Express/morgan request formatting. 
            // Enabling this will override any msg if true. 
            // Will only output colors with colorize set to true
            colorize: true, // Color the text and status code, using the Express/morgan 
            // color palette (text: gray, status: default green, 3XX, 4XX yellow, 5XX red).
            ignoreRoute: function (req, res) { return false; },
            // optional: allows to skip some log messages based on request and/or response
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        // Add cookie parser
        app.use(cookieParser());

    }

    /**
     * Set static files
     */
    private setStaticFiles(app: express.Application) {
        // Set static route for public folder
        const staticFolferPath = path.join(__dirname, '../public');
        app.use(express.static(staticFolferPath, { redirect: true }));
        exists(staticFolferPath, (value) => {
            if (!value) {
                logger.warning(`Static Folder path "${staticFolferPath}" doesn't exists.`);
            }
        });
    }

    /**
     * Normalize port
    * @param {*} val 
    */
    private normalizePort(val: number | string): number | string | boolean {
        const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    /*--------  Methods  --------*/


    /**
     * On error
     * callback event for createServer error
     * @param {*} error 
     */
    @autobind
    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        const bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                logger.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * On listening
     * callback event for createServer listening
     */
    @autobind
    private onListening(): void {
        const addr = this.httpServer.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        logger.debug(`Listening on ${bind}`);
    }

    @autobind
    private onClose(server: http.Server): void {
        const addr = this.httpServer.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        logger.debug(`Stop listening on ${bind}`);
    }
}
