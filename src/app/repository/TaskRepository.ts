import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import ITaskModel from '../model/interfaces/ITaskModel';
import ITimeTriggerModel from '../model/interfaces/ITimeTriggerModel';
import InMemoryRepository from './base/InMemoryRepository';

@sealed
@injectable()
export default class TaskRepository extends InMemoryRepository<ITaskModel> {
    constructor() {
        super([{ _id: null, 
            enabled: true, 
            name: 'Turn Off Heater', 
            action: 'thermostatOff', 
            trigger: <ITimeTriggerModel>{ recurrence: '0 00 1 * * *' } },
        { _id: null, 
            enabled: true, 
            name: 'Turn On Heater', 
            action: 'thermostatOn', 
            trigger: <ITimeTriggerModel>{ recurrence: '0 30 6 * * * *' } }]);
    }
}
