import IProcess from './intefaces/IProcess';
import autobind from 'autobind-decorator';
import { injectable, inject } from 'inversify';
import { ILogger } from './intefaces/ILogger';
import { Types } from '../config/Types';

@injectable()
export default class ProcessManager {

    private processes: IProcess[] = [];

    constructor(@inject(Types.ILogger) protected logger: ILogger) {
    }

    public add(process: IProcess): ProcessManager {
        this.processes.push(process);
        return this;
    }

    public runAll(): ProcessManager {
        this.processes.forEach(this.run);
        return this;
    }

    @autobind
    private run(process: IProcess) {
        try {
            this.logger.info('Starting Process: ', process.identifier);
            process.start();
        } catch (error) {
            this.logger.error('Error starting process: ', process, error.message);
        }
    }
}


