import * as cluster from "cluster"
import * as os from "os";
import WebServer from "../WebServer";
import IProcess from "./IProcess";
import TaskRunner from "../TaskRunner";
import logger from "./Logger";


export default class ProcessManager {

    private processes: IProcess[] = [];

    constructor() {
        
    }

    public addProcess(process:IProcess) : ProcessManager {
        this.processes.push(process);
        return this;
    }

    public runAll() : ProcessManager {
        this.processes.forEach(process => {
            this.run(process);
        });

        return this;
    }
    
    private run(process: IProcess) {
        logger.info("Starting Process: ", process.identifier);
        process.start();
    }
}

   
