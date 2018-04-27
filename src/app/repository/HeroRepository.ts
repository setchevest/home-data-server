import IHeroModel from "./../model/interfaces/IHeroModel";
import HeroSchema from "./../dataAccess/schemas/HeroSchema";
import RepositoryBase from "./base/RepositoryBase";

export default class HeroRepository  extends RepositoryBase<IHeroModel> {
    constructor () {
        super(HeroSchema);
    }    
} 

Object.seal(HeroRepository);