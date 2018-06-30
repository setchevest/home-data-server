import DataAccess from "./../../dataAccess/DataAccess";
import IZoneModel from "../../model/interfaces/IZoneModel";
import { Schema } from "mongoose";

var mongooseConnection = DataAccess.mongooseConnection;

export class ZoneSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            internalId: {
                type: Number,
                required: true,
                index: true
            },
            name: {
                type: String,
                required: true
            }},
            {
                timestamps: true
            });

        this.query.byName = function (name) {
            return this.where({ name: new RegExp(name, 'i') });
        };

        this.query.byInternalId = function (id: number) {
            return this.where({ internalId: id });
        };
    }
}
var model = mongooseConnection.model<IZoneModel>("Zone", new ZoneSchema());
export default model;