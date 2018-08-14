export default interface IAppConfig {
    readonly MONGO_URI: string;
    readonly PORT: number;
    readonly LOG_LEVEL: string;
    readonly UPDATE_INTERVAL: number;
    readonly THERMOSTAT: string;
    readonly IFTTT_KEY: string;
}
