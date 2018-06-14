// import {Request, Response }  from "express";
// import HeroBusiness from "./../app/business/HeroBusiness";
// import IBaseController from "./interfaces/base/IBaseController";
// import IHeroModel from "./../app/model/interfaces/IHeroModel";
// import DefaultControllerOperations from "./base/BaseController";

// export default class HeroController implements IBaseController <HeroBusiness> {
    
//     public create(req: Request, res: Response): void {
//         DefaultControllerOperations.create<IHeroModel>(new HeroBusiness(), req,res);
//     }
//     public update(req: Request, res: Response): void {
//         DefaultControllerOperations.update<IHeroModel>(new HeroBusiness(), req,res);
//     }
//     public delete(req: Request, res: Response): void {
//         DefaultControllerOperations.delete<IHeroModel>(new HeroBusiness(), req,res);
//     }
//     public retrieve(req: Request, res: Response): void {
//         DefaultControllerOperations.retrieve<IHeroModel>(new HeroBusiness(), req,res);
//     }
//     public findById(req: Request, res: Response): void {
//         DefaultControllerOperations.findById<IHeroModel>(new HeroBusiness(), req,res);
//     }
// }
