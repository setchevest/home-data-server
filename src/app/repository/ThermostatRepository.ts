import 'reflect-metadata';
import model from "../dataAccess/schemas/ThermostatSchema";
import RepositoryBase from "./base/RepositoryBase";
import IThermostatModel from "app/model/interfaces/IThermostatModel";
import { sealed } from "../../core/decorators/Sealed";
import * as mongoose from "mongoose";
import { injectable } from 'inversify';


@sealed
@injectable()
export default class ThermostatRepository extends RepositoryBase<IThermostatModel> {
    constructor() {
        super(model);
   }    
}