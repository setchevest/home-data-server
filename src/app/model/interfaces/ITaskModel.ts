
import IModel from "./IModel";
import ITriggerModel from './ITriggerModel'

export default interface ITaskModel extends IModel {
  name: string;
  action: string;
  enabled: boolean;
  trigger: ITriggerModel;
}
