import model from '../dataAccess/schemas/ActionSchema';
import MongooseRepository from './base/MongooseRepository';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import IActionModel from '../model/interfaces/IActionModel';
@sealed
@injectable()
export default class ActionRepository extends MongooseRepository<IActionModel> {
    constructor() {
        super(model);
    }
}