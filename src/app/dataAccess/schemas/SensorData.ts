import DataAccess from "./../../dataAccess/DataAccess";
import ISensorDataModel from "./../../model/interfaces/ISensorDataModel";
import { Schema } from "mongoose";

var mongooseConnection = DataAccess.mongooseConnection;

export class SensorData extends Schema {

    /**
     *
     */
    constructor() {
        super({
            type: {
                type: String,
                required: true
            },
            zone: {
                type: Schema.Types.ObjectId,
                ref: "Zone",
                required: true,
            }
        },
            {
                discriminatorKey: 'type',
                timestamps: true,
            });
        
        this.pre('find', function () {
            this.populate("zone");
        });
    }
}
var model = mongooseConnection.model<ISensorDataModel>("SensorData", new SensorData());
export default model;