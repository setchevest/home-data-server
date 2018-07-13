export default interface IAppConfig {
    readonly MONGO_URI: string;
    readonly PORT: number;
    readonly THERMOSTAT_URL: string;
    readonly LOG_LEVEL: string;
    readonly UPDATE_INTERVAL: number;
}
