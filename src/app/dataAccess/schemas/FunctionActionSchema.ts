import { IFunctionActionSchemaMongooseModel } from '../interfaces/IFunctionActionSchemaMongooseModel';

import { Schema, Model } from 'mongoose';
import Action from './ActionSchema';

export class FunctionActionSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            source: {
                type: String,
                required: true,
            },
            functionName: {
                type: String,
                required: true,
            },
        });
    }
}

const model: Model<IFunctionActionSchemaMongooseModel> = Action.discriminator<IFunctionActionSchemaMongooseModel>('Function', new FunctionActionSchema());
export default model;
