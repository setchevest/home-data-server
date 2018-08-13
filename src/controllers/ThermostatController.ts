import IThermostatModel, { ThermostatMode } from '../app/model/interfaces/IThermostatModel';
import ThermostatBusiness from '../app/business/ThermostatBusiness';
import BaseController from './base/BaseController';
import autobind from 'autobind-decorator';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import { inject } from 'inversify';
import { Types } from '../config/Types';

@autobind
@controller('/api/thermostat')
export default class ThermostatController extends BaseController<IThermostatModel> {
    
    /**
     *
     */
    constructor(@inject(Types.IBaseBusiness_IThermostatModel) business: IBaseBusiness<IThermostatModel>) {
        super(business);
        
    }

    @httpGet('/config')
    public getConfiguration(): Promise<any> {
         return this.processRequest((<ThermostatBusiness>this.business).getConfiguration());
    }
    
    @httpGet('/status')
    public currentStatus(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).getStatus());

    }

    @httpPost('/event')
    public postEvent(): Promise<any> {
        // logger.debug(req.body);
        // res.send({ no: "thing" });
        return null;
    }

    @httpPost('/turnon')
    public turnOn(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setPower(true));

    }

    @httpPost('/turnoff')
    public turnOff(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setPower(false));
    }

    @httpPost('/setautomode')
    public setAutoMode(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setMode(ThermostatMode.Automatic));
    }

    @httpPost('/setamanualmode')
    public setManualMode(): Promise<any> {
        return this.processRequest((<ThermostatBusiness>this.business).setMode(ThermostatMode.Manual));
    }
}
