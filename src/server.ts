import "reflect-metadata"
import WebServer from "./WebServer";
import ProcessManager from "./core/ProcessManager";
import TaskRunner from "./TaskRunner";
import { cleanUpMetadata } from "inversify-express-utils";

// cluster.on("fork", worker => {
//     logger.debug("Worker Id: ", worker.id);
//     worker.once("online", () => {
//         logger.debug("Worker online Id: ", worker.id);
//     })
// });


const manager: ProcessManager = new ProcessManager()
.addProcess(new WebServer())
.addProcess(new TaskRunner())
.runAll();