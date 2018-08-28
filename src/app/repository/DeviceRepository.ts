import model from '../dataAccess/schemas/DeviceSchema';
import MongooseRepository from './base/MongooseRepository';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import IDeviceModel from '../model/interfaces/IDeviceModel';

@sealed
@injectable()
export default class DeviceRepository extends MongooseRepository<IDeviceModel> {
    constructor() {
        super(model);
    }
}

