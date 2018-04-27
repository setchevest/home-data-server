import BaseBusiness from "./Base/BaseBusiness";
import RepositoryBase from "../repository/base/RepositoryBase";
import HeaterStatusRepository from "../repository/HeaterStatusRepository";
import IHeaterStatusModel from "../model/interfaces/IHeaterStatusModel";
import IHeaterStatusBusiness from "./interfaces/IHeaterStatusBusiness";


export default class HeaterStatusBusiness extends BaseBusiness<IHeaterStatusModel> implements IHeaterStatusBusiness {

    constructor () {
        super(new HeaterStatusRepository());
    } 
}


Object.seal(HeaterStatusBusiness);