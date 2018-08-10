import * as dotenv from 'dotenv';
import IAppConfig from './IAppConfig';
import { injectable } from 'inversify';

@injectable()
export class AppConfig implements IAppConfig {
    private envFile = 'src/.env';

    public readonly MONGO_URI: string;
    public readonly PORT: number;
    public readonly LOG_LEVEL: string;
    public readonly UPDATE_INTERVAL: number;

    constructor() {
        this.setEnv();
        this.MONGO_URI = process.env.MONGO_URI;
        this.PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 8080;
        this.LOG_LEVEL = 'debug';
        this.UPDATE_INTERVAL = 60;
    }

    /**
     * Set env
     * Set env from .env or .env.${NODE_ENV} file using dotenv
     */
    private setEnv() {
        // Add NODE_ENV to path if is not production
        if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;
        // Set env from file
        dotenv.config({ path: this.envFile });
    }
}

const current: IAppConfig = new AppConfig();
export default current;
