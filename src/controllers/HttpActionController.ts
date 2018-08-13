import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import { IHttpActionModel } from '../app/model/interfaces/IHttpActionModel';
import { Types } from '../config/Types';

@controller('/api/httpaction')
export default class HttpActionController extends BaseController<IHttpActionModel> {
    constructor(
        @inject(Types.IBaseBusiness_IHttpActionModel)
        business: IBaseBusiness<IHttpActionModel>) {
        super(business);
    }
}