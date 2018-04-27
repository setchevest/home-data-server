import IBaseBusiness from "../interfaces/base/IBaseBusiness";
import RepositoryBase from "../../repository/base/RepositoryBase";
import * as mongoose from "mongoose"


export default abstract class BaseBusiness<T extends mongoose.Document> implements IBaseBusiness<T> {
    
    protected _repository: RepositoryBase<T>;
    
    constructor (repository: RepositoryBase<T>) {
        this._repository = repository;
    }  
        
    public create (item: T, callback: (error: any, result: any) => void) {
        this._repository.create(item, callback);   
    }
   
    public retrieve (callback: (error: any, result: any) => void) {
         this._repository.retrieve(callback);
    }
    
    public update (_id: string, item: T, callback: (error: any, result: any) => void) {
        this._repository.findById(_id, (err, res) => {
            if(err) callback(err, res);
            
            else 
                this._repository.update(res._id, item, callback);
               
        });    
    }
    
    public delete (_id: string, callback:(error: any, result: any) => void) {
        this._repository.delete(_id , callback);
    }
    
    public findById(_id: string, callback: (error: any, result: T) => void) {
        this._repository.findById(_id, callback);
    }
    
}