import {Request} from 'express';
import BaseController from '../../controllers/base/BaseController';
import { controller, httpGet, request, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import IDeviceBusiness from '../../app/business/interfaces/IDeviceBusiness';
import { Types } from '../../config/Types';
import { IMessageBroker } from '../../core/intefaces/IMessageBroker';
import ITestModel from '../app/model/interfaces/ITestModel';
import TestBusiness from '../app/business/TestBusiness';
import TestRepository from '../app/repository/DeviceRepository';

@controller('/api/test')
export default class TestController extends BaseController<ITestModel> {
    constructor(
        @inject(Types.IMessageBroker) private broker: IMessageBroker) {
        super(new TestBusiness(new TestRepository()));
    }

    @httpGet('/init')
    public async init(@request() req: Request): Promise<any> {
        this.broker.publish('virtualDevice/in/init', {
            timestamp: new Date(),
            payload: {},
        });
        return Promise.resolve(true);
    }

    @httpGet('/stop')
    public async stop(@request() req: Request): Promise<any> {
        this.broker.publish('virtualDevice/in/stop', {
            timestamp: new Date(),
            payload: {},
        });
        return Promise.resolve(true);
    }

    @httpGet('/:name/data')
    public async getStatus(@request() req: Request): Promise<any> {
        return Promise.resolve(true);
    }

    @httpPost('/:name/data')
    public async setData(@request() req: Request): Promise<any> {
        return Promise.resolve(true);
    }
}