import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import { IHttpActionModel } from '../app/model/interfaces/IHttpActionModel';

@controller('/api/httpaction')
export default class HttpActionController extends BaseController<IHttpActionModel> {
    constructor(
        @inject('IBaseBusiness<IHttpActionModel>')
        business: IBaseBusiness<IHttpActionModel>) {
        super(business);
    }
}