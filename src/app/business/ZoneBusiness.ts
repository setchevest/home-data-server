import BaseBusiness from "./Base/BaseBusiness";
import IZoneModel from "../model/interfaces/IZoneModel";
import ZoneRepository from "../repository/ZoneRepository";
import { sealed } from "../../core/Decorators";

@sealed
export default class ZoneBusiness extends BaseBusiness<IZoneModel> {
    constructor() {
        super(new ZoneRepository());
    }

    public findByInternalId(internalId: number, callback: (error: any, result: IZoneModel) => void) {
        this.repository.findOne({ internalId: internalId }, callback);
    }

    public create(item: IZoneModel, callback?: (error: any, result: any) => void) : Promise<IZoneModel> {
        var repo = this.repository;
        return this.repository.findOne({ internalId: item.internalId },function (err, zone) {
            if (!zone) {
                repo.create(item, callback);
            }
            else {
                callback(null, zone);
            }
        });
    }

}