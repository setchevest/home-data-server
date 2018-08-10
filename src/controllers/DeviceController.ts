import BaseController from './base/BaseController';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import IActionModel from '../app/model/interfaces/IActionModel';
import IDeviceModel from '../app/model/interfaces/IDeviceModel';

@controller('/api/device')
export default class DeviceController extends BaseController<IDeviceModel> {
    constructor(
        @inject('IBaseBusiness<IDeviceModel>')
        business: IBaseBusiness<IDeviceModel>) {
        super(business);
    }
}