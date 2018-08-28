import model from '../dataAccess/schemas/GenericDeviceSchema';
import MongooseRepository from './base/MongooseRepository';
import { IGenericDeviceModel } from '../model/interfaces/IGenericDeviceModel';

export default class GenericDeviceRepository extends MongooseRepository<IGenericDeviceModel> {
    constructor() {
        super(model);
    }
}