import 'reflect-metadata';
import { cleanUpMetadata } from 'inversify-express-utils';
cleanUpMetadata();
import container from './config/Inversify.config';
import IProcess from './core/intefaces/IProcess';
import DataInitializer from './config/data/DataInitializer';
import { IProcessManager } from './core/intefaces/IProcessManager';
import { Events } from './app/business/Events';

// cluster.on("fork", worker => {
//     logger.debug("Worker Id: ", worker.id);
//     worker.once("online", () => {
//         logger.debug("Worker online Id: ", worker.id);
//     })
// });

const initializer: DataInitializer = new DataInitializer();
initializer.initializeData();

const manager: IProcessManager = container.get<IProcessManager>('IProcessManager');
container.getAll<IProcess>('IProcess').forEach(process => {
    manager.add(process);
});
manager.runAll();
