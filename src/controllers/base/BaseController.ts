import * as express from "express";
import IBaseController from "../interfaces/base/IBaseController";
import IBaseBusiness from "../../app/business/interfaces/base/IBaseBusiness";

export default class BaseController {

    public static create<T>(business: IBaseBusiness<T>, req: express.Request, res: express.Response): void {
        BaseController.processRequest(req,res,()=>{
            var entity: T = <T>req.body;
            business.create(entity, (error, result) => {
                if (error) res.send(BaseController.createErrorResponse(error));
                else res.send({ status: "success", data: result });
            });
        });
    }

    public static update<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        BaseController.processRequest(req,res,()=>{
            var entity: T = <T>req.body;
            var _id: string = req.params._id;
            business.update(_id, entity, (error, result) => {
                if (error) res.send(BaseController.createErrorResponse(error));
                else res.send({ status: "success", data: result });
            });
        });
    }
    public static delete<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        BaseController.processRequest(req,res,()=>{
            var _id: string = req.params._id;
            business.delete(_id, (error, result) => {
                if (error) res.send(BaseController.createErrorResponse(error));
                else res.send({ status: "success", data: result });
            });
        });
    }
    public static retrieve<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        BaseController.processRequest(req,res,()=>{
            business.retrieve((error, result) => {
                if (error) res.send(BaseController.createErrorResponse(error));
                else res.send(result);
            });
        });
    }
    public static findById<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {

        BaseController.processRequest(req,res,()=>{
            var _id: string = req.params._id;
            business.findById(_id, (error, result) => {
                if (error) res.send(BaseController.createErrorResponse(error));
                else res.send(result);
            });
        });
    }

    public static processRequest(req: express.Request, res: express.Response, fn:()=>void): void{
        try {
            fn();
        }
        catch (e) {
            console.log(e);
            res.send(BaseController.createErrorResponse(e));
        }
    }

    public static createErrorResponse(error: any): any {
        return { status: "error", error: "An error has occured", errorMessage: error.message };
    }

}
