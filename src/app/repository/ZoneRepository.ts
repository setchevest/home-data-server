import model from "../dataAccess/schemas/ZoneSchema"
import RepositoryBase from "./base/RepositoryBase";
import IZoneModel from "../model/interfaces/IZoneModel";
import { sealed } from "../../core/decorators/Sealed";
import { injectable } from 'inversify';

@sealed
@injectable()
export default class ZoneRepository extends RepositoryBase<IZoneModel> {
    constructor() {
        super(model);
   }
}