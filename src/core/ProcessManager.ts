import IProcess from "./IProcess";
import logger from "./Logger";
import { EventEmitter } from "events";

export default class ProcessManager extends EventEmitter {

    private processes: IProcess[] = [];

    constructor() {
        super();
    }

    public addProcess(process:IProcess) : ProcessManager {
        this.processes.push(process);
        return this;
    }

    public runAll() : ProcessManager {
        this.processes.forEach(process => {
            try {
                this.run(process);    
            } catch (error) {
                logger.error("Error starting process: ",process,  error)
            }
        });

        return this;
    }
    
    private run(process: IProcess) {
        logger.info("Starting Process: ", process.identifier);
        process.start(this);
    }
}

   
