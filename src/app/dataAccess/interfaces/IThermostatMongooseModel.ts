import IThermostatModel from '../../model/interfaces/IThermostatModel';
import IMongooseModel from './IMongooseModel';
export interface IThermostatMongooseModel extends IMongooseModel, IThermostatModel {
}