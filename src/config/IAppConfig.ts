export default interface IAppConfig {
    readonly MONGO_URI: string;
    readonly PORT: number;
    readonly LOG_LEVEL: string;
    readonly UPDATE_INTERVAL: number;
}
