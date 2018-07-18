import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import ITaskModel from '../app/model/interfaces/ITaskModel';

@controller('/api/task')
export default class TaskController extends BaseController<ITaskModel> {

    constructor(@inject('IBaseBusiness<ITaskModel>') business: IBaseBusiness<ITaskModel>) {
        super(business);
    }
}

