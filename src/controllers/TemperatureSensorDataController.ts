import BaseController from './base/BaseController';
import ITemperatureSensorDataModel from '../app/model/interfaces/ITemperatureSensorDataModel';
import { controller } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';

@controller('/api/temperatureSensorData')
export default class TemperatureSensorDataController extends BaseController<ITemperatureSensorDataModel> {

    constructor(@inject('IBaseBusiness<ITemperatureSensorDataModel>') business: IBaseBusiness<ITemperatureSensorDataModel>) {
        super(business);
    }
}
