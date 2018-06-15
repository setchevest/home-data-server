import * as dotenv from "dotenv";

export default class AppConfig {

    private static _instance : AppConfig;
    
    public static get Instance() {
        return this._instance || (this._instance = new AppConfig());
    }
    private envFile = 'src/.env';

    public readonly MONGO_URI: string;
    public readonly PORT: number;
    public readonly THERMOSTAT_URL: string;
    public readonly LogLevel: string;

    constructor() {
      this.setEnv();
      this.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/home";
      this.PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 8080;
      this.THERMOSTAT_URL = process.env.THERMOSTAT_URL || "http://192.168.0.16:9000";
      this.LogLevel = "dev";
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