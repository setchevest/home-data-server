import model from '../dataAccess/schemas/TimeTriggerSchema';
import MongooseRepository from './base/MongooseRepository';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import ITimeTriggerModel from '../model/interfaces/ITimeTriggerModel';
@sealed
@injectable()
export default class TimeTriggerRepository extends MongooseRepository<ITimeTriggerModel> {
    constructor() {
        super(model);
    }
}