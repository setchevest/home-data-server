import model from '../dataAccess/schemas/TaskSchema';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import ITaskModel from '../model/interfaces/ITaskModel';
// import ITimeTriggerModel from '../model/interfaces/ITimeTriggerModel';
// import InMemoryRepository from './base/InMemoryRepository';
// import { IFunctionActionModel } from '../model/interfaces/IFunctionActionModel';
import MongooseRepository from './base/MongooseRepository';

@sealed
@injectable()
export default class TaskRepository extends MongooseRepository<ITaskModel> {
    constructor() {
        super(model);
    }
}
