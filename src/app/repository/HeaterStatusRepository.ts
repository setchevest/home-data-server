import HeaterStatusSchema from "./../dataAccess/schemas/HeaterStatusSchema";
import RepositoryBase from "./base/RepositoryBase";
import IHeaterModel from "../model/interfaces/IHeaterStatusModel";

export default class HeaterStatusRepository extends RepositoryBase<IHeaterModel> {
    constructor () {
        super(HeaterStatusSchema);
    }    
} 

Object.seal(HeaterStatusRepository);