import * as Mongoose from "mongoose";
import AppConfig from "./../../config/AppConfig";

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
            console.log("CONNECTED TO MONGO AT: %s",AppConfig.Instance.MONGO_URI);
        });
        console.log("CONNECTING TO MONGO AT: %s",AppConfig.Instance.MONGO_URI);
        var self = this;
        self._mongooseInstance = Mongoose.connect(AppConfig.Instance.MONGO_URI).catch(error=>{
            console.log("CONNECTION ERROR");
            console.log(error);
            self._mongooseInstance = null;
        });
        
        return this._mongooseInstance;
    }

}
export default DataAccess;
