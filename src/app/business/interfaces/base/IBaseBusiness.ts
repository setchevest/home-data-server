import IRead from "./../common/IRead";
import IWrite from "./../common/IWrite";
export default interface IBaseBusiness<T> extends IRead<T>, IWrite<T> 
{
}