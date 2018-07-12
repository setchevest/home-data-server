import 'reflect-metadata';
import model from "../dataAccess/schemas/ThermostatSchema";
import MongooseRepositoryBase from "./base/MongooseRepositoryBase";
import IThermostatModel from "../model/interfaces/IThermostatModel";
import { sealed } from "../../core/decorators/Sealed";
import * as mongoose from "mongoose";
import { injectable } from 'inversify';


@sealed
@injectable()
export default class ThermostatRepository extends MongooseRepositoryBase<IThermostatModel> {
    constructor() {
        super(model);
   }    
}