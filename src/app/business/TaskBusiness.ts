import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import ITaskModel from '../model/interfaces/ITaskModel';

@sealed
@injectable()
export default class TaskBusiness extends BaseBusiness<ITaskModel> {
    constructor(@inject('IRepository<ITaskModel>')
        repository: IRepository<ITaskModel>) {
        super(repository);
    }
}
