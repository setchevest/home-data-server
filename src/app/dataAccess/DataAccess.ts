import * as Mongoose from 'mongoose';
import container from '../../config/inversify.config';
import logger from '../../core/Logger';
import IAppConfig from '../../config/AppConfig';


export class DataAccess {
    private static _mongooseInstance: any;
    private static _mongooseConnection: Mongoose.Connection;

    public static get mongooseInstance() {
        return this.connect();
    }

    public static get mongooseConnection() {
        if (!this._mongooseConnection)
            this.connect();
        
        return this._mongooseConnection;
    }

    constructor() {
    }

    static connect(): Mongoose.Connection {
        if (this._mongooseInstance != null) return this._mongooseInstance;
        this._mongooseConnection = Mongoose.connection;
        this._mongooseConnection.once('open', () => {
            logger.debug('CONNECTED TO MONGO AT:', IAppConfig.MONGO_URI);
        });
        logger.debug('CONNECTING TO MONGO AT:', IAppConfig.MONGO_URI);
        const self = this;
        self._mongooseInstance = Mongoose.connect(IAppConfig.MONGO_URI).catch(error => {
            logger.error('CONNECTION ERROR', error);
            self._mongooseInstance = null;
        });
        
        return this._mongooseInstance;
    }

}
export default DataAccess;
