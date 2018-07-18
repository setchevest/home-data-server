import IProcess from './IProcess';
import logger from './Logger';
import { EventEmitter } from 'events';
import autobind from 'autobind-decorator';

export default class ProcessManager extends EventEmitter {

    private processes: IProcess[] = [];

    constructor() {
        super();
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
            logger.info('Starting Process: ', process.identifier);
            process.start(this);
        } catch (error) {
            logger.error('Error starting process: ', process, error.message);
        }
    }
}


