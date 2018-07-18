import 'reflect-metadata';
import { cleanUpMetadata } from 'inversify-express-utils';
cleanUpMetadata();
import container from './config/inversify.config';
import ProcessManager from './core/ProcessManager';
import IProcess from './core/IProcess';
import DataInitializer from './config/data/DataInitializer';

// cluster.on("fork", worker => {
//     logger.debug("Worker Id: ", worker.id);
//     worker.once("online", () => {
//         logger.debug("Worker online Id: ", worker.id);
//     })
// });
const initializer: DataInitializer = new DataInitializer();
initializer.initializeData();

const manager: ProcessManager = new ProcessManager();
container.getAll<IProcess>('IProcess').forEach(process => {
    manager.add(process);
});
manager.runAll();
