import BaseBusiness from "./Base/BaseBusiness";
import IZoneModel from "../model/interfaces/IZoneModel";
import { sealed } from "../../core/decorators/Sealed";
import { injectable, inject } from 'inversify';
import IRepository from "../repository/interfaces/IRepository";

@sealed
@injectable()
export default class ZoneBusiness extends BaseBusiness<IZoneModel> {
    constructor(@inject("IRepository<IZoneModel>") repository: IRepository<IZoneModel>) {
        super(repository);
    }

    public findByInternalId(internalId: number, callback: (error: any, result: IZoneModel) => void) : Promise<IZoneModel> {
        return this.repository.findOne({ internalId: internalId }, callback);
    }

    public create(item: IZoneModel, callback?: (error: any, result: any) => void) : Promise<IZoneModel> {
        var repo = this.repository;
        return new Promise<IZoneModel>((resolve, reject)=>{
            this.repository.findOne({ internalId: item.internalId }, function (err, zone) {
                if (!zone) {
                    repo.create(item, callback).then(resolve).catch(reject);
                }
                else{
                    resolve(zone)
                }
            });
        })
    }

}