import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import ITimeTriggerModel from '../app/model/interfaces/ITimeTriggerModel';
@controller('/api/timetrigger')
export default class TimeTriggerController extends BaseController<ITimeTriggerModel> {
    constructor(
        @inject('IBaseBusiness<ITimeTriggerModel>')
        business: IBaseBusiness<ITimeTriggerModel>) {
        super(business);
    }
}