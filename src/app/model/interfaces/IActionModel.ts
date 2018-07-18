import IModel from './IModel';

export default interface IActionModel extends IModel {
  name: string;
  parameters?: any[];
}

