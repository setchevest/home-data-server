import { ITimeTriggerMongooseModel } from '../interfaces/ITimeTriggerMongooseModel';

import { Schema, Model } from 'mongoose';
import Trigger from './TriggerSchema';

export class TimeTriggerSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            recurrence: {
                type: String,
                required: true,
            },
        });
    }
}

const model: Model<ITimeTriggerMongooseModel> = 
    <Model<ITimeTriggerMongooseModel>>Trigger.discriminator('Time', new TimeTriggerSchema());
export default model;
