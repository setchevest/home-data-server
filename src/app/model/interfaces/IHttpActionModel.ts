import IActionModel from './IActionModel';
export interface IHttpActionModel extends IActionModel {
    verb: string;
    url: string;
}
