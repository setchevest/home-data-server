import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import ITimeTriggerModel from '../model/interfaces/ITimeTriggerModel';

@sealed
@injectable()
export default class TimeTriggerBusiness extends BaseBusiness<ITimeTriggerModel> {
    constructor(@inject('IRepository<ITimeTriggerModel>')
        repository: IRepository<ITimeTriggerModel>) {
        super(repository);
    }
}

