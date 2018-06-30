import model from "../dataAccess/schemas/ZoneSchema"
import RepositoryBase from "./base/RepositoryBase";
import IZoneModel from "../model/interfaces/IZoneModel";
import { sealed } from "../../core/Decorators";
@sealed
export default class ZoneRepository extends RepositoryBase<IZoneModel> {
    constructor() {
        super(model);
    }
}