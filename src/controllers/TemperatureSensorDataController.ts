import {apiController} from "../core/Decorators"
import BaseController from "./base/BaseController";
import ITemperatureSensorDataModel from "../app/model/interfaces/ITemperatureSensorDataModel";
import TemperatureSensorDataBusiness from "../app/business/TemperatureSensorDataBusiness";

@apiController
export default class TemperatureSensorDataController extends BaseController<ITemperatureSensorDataModel> {

    constructor() {
        super(new TemperatureSensorDataBusiness());
    }
}
