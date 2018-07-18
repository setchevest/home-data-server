import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import { IFunctionActionModel } from '../app/model/interfaces/IFunctionActionModel';

@controller('/api/functionaction')
export default class FunctionActionController extends BaseController<IFunctionActionModel> {
    constructor(
        @inject('IBaseBusiness<IFunctionActionModel>')
        business: IBaseBusiness<IFunctionActionModel>) {
        super(business);
    }
}