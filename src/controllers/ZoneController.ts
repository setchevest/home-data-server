import ZoneBusiness from "../app/business/ZoneBusiness";
import IZoneModel from "../app/model/interfaces/IZoneModel";
import BaseController from "./base/BaseController";
import { apiController } from "../core/Decorators"

@apiController
export default class ZoneController extends BaseController<IZoneModel> {

    /**
     *
     */
    constructor() {
        super(new ZoneBusiness());
    }
}
