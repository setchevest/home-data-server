import model from "../dataAccess/schemas/ThermostatSchema";
import RepositoryBase from "./base/RepositoryBase";
import IThermostatModel from "app/model/interfaces/IThermostatModel";
import { sealed } from "../../core/Decorators";
@sealed

export default class ThermostatRepository extends RepositoryBase<IThermostatModel> {
    constructor () {
        super(model);
    }    
}