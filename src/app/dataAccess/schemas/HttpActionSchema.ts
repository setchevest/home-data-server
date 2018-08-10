import { Schema, Model } from 'mongoose';
import Action from './ActionSchema';
import { IHttpActionSchemaMongooseModel } from '../interfaces/IHttpActionSchemaMongooseModel';
import DataAccess from '../DataAccess';

export class HttpActionSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            verb: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        });
    }
}

const model: Model<IHttpActionSchemaMongooseModel> = Action.discriminator<IHttpActionSchemaMongooseModel>('Http', new HttpActionSchema());
export default model;
