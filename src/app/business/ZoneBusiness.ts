import BaseBusiness from './Base/BaseBusiness';
import IZoneModel from '../model/interfaces/IZoneModel';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { Types } from '../../config/Types';

@sealed
@injectable()
export default class ZoneBusiness extends BaseBusiness<IZoneModel> {
    constructor(@inject(Types.IRepository_IZoneModel) repository: IRepository<IZoneModel>) {
        super(repository);
    }

    public findByInternalId(internalId: number): Promise<IZoneModel> {
        return this.repository.findOne({ internalId: internalId });
    }

    public create(item: IZoneModel): Promise<IZoneModel> {
        const repo = this.repository;
        return new Promise<IZoneModel>((resolve, reject) => {
            this.repository.findOne({ internalId: item.internalId }).then( zone => {
                if (!zone) {
                    repo.create(item).then(resolve).catch(reject);
                } else {
                    resolve(zone);
                }
            });
        });
    }

}
