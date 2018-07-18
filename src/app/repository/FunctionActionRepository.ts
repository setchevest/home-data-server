import model from '../dataAccess/schemas/FunctionActionSchema';
import MongooseRepository from './base/MongooseRepository';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import { IFunctionActionModel } from '../model/interfaces/IFunctionActionModel';
@sealed
@injectable()
export default class FunctionActionRepository extends MongooseRepository<IFunctionActionModel> {
    constructor() {
        super(model);
    }
}