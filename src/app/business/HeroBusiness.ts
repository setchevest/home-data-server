import HeroRepository from "./../repository/HeroRepository";
import IHeroBusiness from "./interfaces/IHeroBusiness";
import IHeroModel from "./../model/interfaces/IHeroModel";
import HeroModel from "./../model/HeroModel";
import BaseBusiness from "./Base/BaseBusiness";
import RepositoryBase from "../repository/base/RepositoryBase";


export default class HeroBusiness extends BaseBusiness<IHeroModel> implements IHeroBusiness {

    constructor () {
        super(new HeroRepository());
    } 
}


Object.seal(HeroBusiness);