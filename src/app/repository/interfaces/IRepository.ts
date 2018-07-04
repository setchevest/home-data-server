import IRead from "./base/IRead";
import IWrite from "./base/IWrite";

export default interface IRepository<T> extends IRead<T>, IWrite<T> {
    
} 