import IModel from '../../../../app/model/interfaces/IModel';
export default interface ITestModel extends IModel {
  type: string;
  name: string;
  enabled: Boolean;
  config: any;
}
