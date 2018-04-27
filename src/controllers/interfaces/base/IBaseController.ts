import IReadController from "./../common/IReadController";
import IWriteController from "./../common/IWriteController";
import IBaseBusiness from "../../../app/business/interfaces/base/IBaseBusiness";

export default interface BaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController{
    
    
} 