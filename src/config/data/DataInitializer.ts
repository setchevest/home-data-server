import * as path from 'path';
import IModel from '../../app/model/interfaces/IModel';
import ITaskModel from '../../app/model/interfaces/ITaskModel';
import IZoneModel from '../../app/model/interfaces/IZoneModel';
import IRepository from '../../app/repository/interfaces/IRepository';
import TaskRepository from '../../app/repository/TaskRepository';
import ZoneRepository from '../../app/repository/ZoneRepository';
import logger from '../../core/Logger';
import FunctionActionRepository from '../../app/repository/FunctionActionRepository';
import { IFunctionActionModel } from '../../app/model/interfaces/IFunctionActionModel';
import ITriggerModel from '../../app/model/interfaces/ITriggerModel';
import ITimeTriggerModel from '../../app/model/interfaces/ITimeTriggerModel';
import TimeTriggerRepository from '../../app/repository/TimeTriggerRepository';

export class InitializeOptions<T> {
    constructor(private fileName: string, private repo: IRepository<T>) {

    }

    public initialize(root: string) {
        const self = this;
        this.repo.retrieveMany(1, 0).then(items => {
            if (items.length === 0) {
                const file = path.resolve(path.join(root, this.fileName));
                logger.info('Initializing data: ', file);
                try {
                    const data = require(file);
                    this.repo.createMany(data).then(res => {
                        logger.info('Data Initialized: ', res.length);
                    })
                        .catch(error => {
                            logger.error('Data Initializer error: ', error.message);
                        });
                } catch (error) {
                    logger.error('Data Initializer error: ', error.message);
                }
            }
        });
    }
}

export default class DataInitializer {

    private initializablefiles: Array<InitializeOptions<IModel>>;

    constructor() {
        this.initializablefiles = new Array<InitializeOptions<IModel>>();
        this.initializablefiles.push(new InitializeOptions<IFunctionActionModel>('FunctionActions.json', new FunctionActionRepository()));
        this.initializablefiles.push(new InitializeOptions<ITimeTriggerModel>('TimeTriggers.json', new TimeTriggerRepository()));
        this.initializablefiles.push(new InitializeOptions<ITaskModel>('Tasks.json', new TaskRepository()));
        this.initializablefiles.push(new InitializeOptions<IZoneModel>('Zones.json', new ZoneRepository()));
    }

    public initializeData() {
        this.initializablefiles.forEach(init => {
            init.initialize('src/config/data');
        });
    }
}