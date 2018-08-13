import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import ITimeTriggerModel from '../app/model/interfaces/ITimeTriggerModel';
import { Types } from '../config/Types';
@controller('/api/timetrigger')
export default class TimeTriggerController extends BaseController<ITimeTriggerModel> {
    constructor(
        @inject(Types.IBaseBusiness_ITimeTriggerModel)
        business: IBaseBusiness<ITimeTriggerModel>) {
        super(business);
    }
}