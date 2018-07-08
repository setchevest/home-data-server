import IZoneModel from "../app/model/interfaces/IZoneModel";
import BaseController from "./base/BaseController";
import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import IBaseBusiness from "app/business/interfaces/base/IBaseBusiness";
@controller("/api/zone")
export default class ZoneController extends BaseController<IZoneModel> {

    /**
     *
     */
    constructor(@inject("IBaseBusiness<IZoneModel>")business: IBaseBusiness<IZoneModel>) {
        super(business);
    }
}
