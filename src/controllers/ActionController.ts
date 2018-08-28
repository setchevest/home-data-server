import BaseController from './base/BaseController';
import { controller} from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import IActionModel from '../app/model/interfaces/IActionModel';
import { Types } from '../config/Types';

@controller('/api/action')
export default class ActionController extends BaseController<IActionModel> {
    constructor(
        @inject(Types.IBaseBusiness_IActionModel) business: IBaseBusiness<IActionModel>) {
        super(business);
    }
}