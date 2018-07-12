import model from "../dataAccess/schemas/ZoneSchema"
import MongooseRepositoryBase from "./base/MongooseRepositoryBase";
import IZoneModel from "../model/interfaces/IZoneModel";
import { sealed } from "../../core/decorators/Sealed";
import { injectable } from 'inversify';

@sealed
@injectable()
export default class ZoneRepository extends MongooseRepositoryBase<IZoneModel> {
    constructor() {
        super(model);
   }
}