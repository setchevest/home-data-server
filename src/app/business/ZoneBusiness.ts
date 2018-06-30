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
        this._repository.findOneWhere({ internalId: internalId }, callback);
    }

    public create(item: IZoneModel, callback: (error: any, result: any) => void) {
        var repo = this._repository;
        this._repository.findOneWhere({ internalId: item.internalId },function (err, zone) {
            if (!zone) {
                repo.create(item, callback);
            }
            else {
                callback(null, zone);
            }
        });

        // this._repository.model.findOne().byInternalId(item.internalId).exec( function (err, zone) {
        //     if (!zone) {
        //         repo.create(item, callback);
        //     }
        //     else {
        //         callback(null, zone);
        //     }
        // });
    }

}