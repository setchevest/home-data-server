export interface ILogger {
    error(message, ...data: any[]): void;
    info(message, ...data: any[]): void;
    debug(message, ...data: any[]): void;
    warning(message, ...data: any[]): void;
    critical(message, ...data: any[]): void;
}