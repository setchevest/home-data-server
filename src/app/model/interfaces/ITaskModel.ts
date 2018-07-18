
import IModel from './IModel';
import ITriggerModel from './ITriggerModel';
import IActionModel from './IActionModel';

export default interface ITaskModel extends IModel {
  name: string;
  enabled: boolean;
  action: IActionModel;
  trigger: ITriggerModel;
}
