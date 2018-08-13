import BaseBusiness from './Base/BaseBusiness';
import ITemperatureSensorDataModel from '../model/interfaces/ITemperatureSensorDataModel';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { Types } from '../../config/Types';

@sealed
@injectable()
export default class TemperatureSensorDataBusiness extends BaseBusiness<ITemperatureSensorDataModel> {
    constructor(@inject(Types.IRepository_ITemperatureSensorDataModel)
        repository: IRepository<ITemperatureSensorDataModel>) {
        super(repository);
    }
}
