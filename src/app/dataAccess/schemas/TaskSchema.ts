import DataAccess from "./../../dataAccess/DataAccess";
import { Schema } from "mongoose";
import ITaskModel from "../../model/interfaces/ITaskModel";

var mongooseConnection = DataAccess.mongooseConnection;

export class TaskSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            name: { type: String, required: true },
            enabled: { type: String, required: true },
            action: { type: String },
            trigger: { type: String },
        },
            {
                timestamps: true
            });
    }
}
var model = mongooseConnection.model<ITaskModel>("Task", new TaskSchema());
export default model;