import ITaskModel from '../../model/interfaces/ITaskModel';
import IMongooseModel from './IMongooseModel';
export interface ITaskMongooseModel extends IMongooseModel, ITaskModel {
}