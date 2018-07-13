import 'reflect-metadata';
import { cleanUpMetadata } from 'inversify-express-utils';
cleanUpMetadata();
import container from './config/inversify.config';
import ProcessManager from './core/ProcessManager';
import IProcess from './core/IProcess';

// cluster.on("fork", worker => {
//     logger.debug("Worker Id: ", worker.id);
//     worker.once("online", () => {
//         logger.debug("Worker online Id: ", worker.id);
//     })
// });


const manager: ProcessManager = new ProcessManager();
container.getAll<IProcess>('IProcess').forEach(process => {
    manager.addProcess(process);
});
manager.runAll();
