import ISensorDataModel from '../../model/interfaces/ISensorDataModel';
import IMongooseModel from './IMongooseModel';
export interface ISensorDataMongooseModel extends IMongooseModel, ISensorDataModel {
}