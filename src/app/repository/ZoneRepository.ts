import model from '../dataAccess/schemas/ZoneSchema';
import MongooseRepository from './base/MongooseRepository';
import IZoneModel from '../model/interfaces/IZoneModel';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';

@sealed
@injectable()
export default class ZoneRepository extends MongooseRepository<IZoneModel> {
    constructor() {
        super(model);
   }
}
