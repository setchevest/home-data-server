import {Request} from 'express';
import BaseController from './base/BaseController';
import { controller, httpGet, request, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import IDeviceModel from '../app/model/interfaces/IDeviceModel';
import IDeviceBusiness from '../app/business/interfaces/IDeviceBusiness';
import { Types } from '../config/Types';

@controller('/api/device')
export default class DeviceController extends BaseController<IDeviceModel> {
    constructor(
        @inject(Types.IDeviceBusiness)business: IDeviceBusiness) {
        super(business);
    }

    @httpGet('/:name/data')
    public async getStatus(@request() req: Request): Promise<any> {
        return (<IDeviceBusiness>this.business).getDeviceData(req.params.name, req.query);
    }

    @httpPost('/:name/data')
    public async setData(@request() req: Request): Promise<any> {
        return (<IDeviceBusiness>this.business).setDeviceData(req.params.name, req.body);
    }
}