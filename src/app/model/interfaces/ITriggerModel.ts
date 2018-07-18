import IModel from './IModel';

export default interface ITriggerModel extends IModel {
  startDate?: Date;
  endDate?: Date;
}
