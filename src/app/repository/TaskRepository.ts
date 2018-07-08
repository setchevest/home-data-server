import model from "../dataAccess/schemas/TaskSchema"
import RepositoryBase from "./base/RepositoryBase";
import { sealed } from "../../core/decorators/Sealed";
import { injectable } from 'inversify';
import ITaskModel from "../model/interfaces/ITaskModel";
import ITimeTriggerModel from "../model/interfaces/ITimeTriggerModel";

@sealed
@injectable()
export default class TaskRepository extends RepositoryBase<ITaskModel> {
    constructor() {
        super(model);
    }

    private readonly items: any[] = [
        // { name: "Check Status", action: "getStatus", trigger: <ITimeTriggerModel>{ recurrence: "0 */1 * * * *" } },
        { name: "Turn On Heater", action: "thermostatOn", trigger: <ITimeTriggerModel>{ recurrence: "0 00 1 * * *" } },
        { name: "Turn Off Heater", action: "thermostatOff", trigger: <ITimeTriggerModel>{ recurrence: "0 30 6 * * * *" } }
    ];

    public retrieve(callback?: (error: any, result: ITaskModel[]) => void): Promise<ITaskModel[]> {
        return new Promise<ITaskModel[]>((resolve, reject) => {
            resolve(this.items);
        });
    }

}