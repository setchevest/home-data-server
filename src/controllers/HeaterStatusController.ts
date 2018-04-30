import {Request, Response }  from "express";
import IBaseController from "./interfaces/base/IBaseController";
import DefaultControllerOperations from "./base/BaseController";
import IHeaterStatusBusiness from "app/business/interfaces/IHeaterStatusBusiness";
import IHeaterStatusModel from "app/model/interfaces/IHeaterStatusModel";
import HeaterStatusBusiness from "../app/business/HeaterStatusBusiness";
import HeaterStatusModel from "app/model/HeaterStatusModel";


export default class HeaterStatusController implements IBaseController<IHeaterStatusBusiness> {
    
    public create(req: Request, res: Response): void {
        DefaultControllerOperations.create<IHeaterStatusModel>(new HeaterStatusBusiness(), req,res);
    }

    public update(req: Request, res: Response): void {
        DefaultControllerOperations.update<IHeaterStatusModel>(new HeaterStatusBusiness(), req,res);
    }

    public delete(req: Request, res: Response): void {
        DefaultControllerOperations.delete<IHeaterStatusModel>(new HeaterStatusBusiness(), req,res);
    }

    public retrieve(req: Request, res: Response): void {
        DefaultControllerOperations.retrieve<IHeaterStatusModel>(new HeaterStatusBusiness(), req,res);
    }

    public findById(req: Request, res: Response): void {
        DefaultControllerOperations.findById<IHeaterStatusModel>(new HeaterStatusBusiness(), req,res);
    }

    public setHeaterMode(req: Request, res: Response): void {
        DefaultControllerOperations.processRequest(req,res, ()=>{
            var entity: IHeaterStatusModel = <IHeaterStatusModel>req.body;
            res.send({data: entity});
        })
    }

    public getCurrentStatus(req: Request, res: Response): void {
        DefaultControllerOperations.processRequest(req,res, ()=>{
            res.send({data: {mode:"automatic", isOn: false, temperature: 19}});
        });
    }
}
