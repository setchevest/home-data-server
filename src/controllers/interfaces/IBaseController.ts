import IReadController from "./IReadController";
import IWriteController from "./IWriteController";

export default interface IBaseController<T> extends IReadController, IWriteController
{

}