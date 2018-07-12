import IRead from "../../../repository/interfaces/base/IRead";
import IWrite from "../../../repository/interfaces/base/IWrite";

export default interface IBaseBusiness<T> extends IRead<T>, IWrite<T> 
{
}