import IActionModel from './IActionModel';
export interface IFunctionActionModel extends IActionModel {
    source: string;
    functionName: string;
}
