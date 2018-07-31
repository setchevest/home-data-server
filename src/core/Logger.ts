import { ILogger } from './intefaces/ILogger';

import * as winston from 'winston';
import IAppConfig from '../config/AppConfig';


class Logger implements ILogger {

    private logger: winston.Logger;

    /**
     *
     */
    constructor() {
        this.logger = winston.createLogger({
            level: IAppConfig.LOG_LEVEL,
            format: winston.format.json(),
            // transports: [
            //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
            //     new winston.transports.File({ filename: 'combined.log' })
            // ]
        });
        
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                  ),
            }));
        }
    }

    public error(message: any, ...data: any[]): void {
        this.logger.error(message, data);
    }

    public info(message: any, ...data: any[]): void {
        this.logger.info(message, data);
    }

    public debug(message: any, ...data: any[]): void {
        this.logger.debug(message, data);
    }

    public warning(message: any, ...data: any[]): void {
        this.logger.warn(message, data);
    }

    public critical(message: any, ...data: any[]): void {
        this.logger.crit(message, data);
    }

    public log(level: string, message: any, ...data: any[]): void {
        this.logger.log(level, message, data);
    }
}

const logger: ILogger = new Logger();

export default logger;
