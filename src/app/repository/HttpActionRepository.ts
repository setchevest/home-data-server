import model from '../dataAccess/schemas/HttpActionSchema';
import MongooseRepository from './base/MongooseRepository';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import { IHttpActionModel } from '../model/interfaces/IHttpActionModel';
@sealed
@injectable()
export default class HttpActionRepository extends MongooseRepository<IHttpActionModel> {
    constructor() {
        super(model);
    }
}