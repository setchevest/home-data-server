import * as Mongoose from "mongoose";
import AppConfig from "../../config/AppConfig";
import logger from "../../core/Logger";

export class DataAccess {
    private static _mongooseInstance: any;
    private static _mongooseConnection: Mongoose.Connection;

    public static get mongooseInstance() {
        return this.connect();
    }

    public static get mongooseConnection() {
        if(!this._mongooseConnection)
            this.connect();
        
        return this._mongooseConnection;
    }

    constructor() {
    }

    static connect(): Mongoose.Connection {
        if (this._mongooseInstance) return this._mongooseInstance;

        this._mongooseConnection = Mongoose.connection;
        this._mongooseConnection.once("open", () => {
            logger.debug("CONNECTED TO MONGO AT:",AppConfig.Instance.MONGO_URI);
        });
        logger.debug("CONNECTING TO MONGO AT:", AppConfig.Instance.MONGO_URI);
        var self = this;
        self._mongooseInstance = Mongoose.connect(AppConfig.Instance.MONGO_URI).catch(error=>{
            logger.error("CONNECTION ERROR", error);
            self._mongooseInstance = null;
        });
        
        return this._mongooseInstance;
    }

}
export default DataAccess;
