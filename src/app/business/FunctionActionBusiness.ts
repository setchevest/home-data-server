import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { IFunctionActionModel } from '../model/interfaces/IFunctionActionModel';
@sealed
@injectable()
export default class FunctionActionBusiness extends BaseBusiness<IFunctionActionModel> {
    constructor(
        @inject('IRepository<IFunctionActionModel>')
        repository: IRepository<IFunctionActionModel>) {
        super(repository);
    }
}