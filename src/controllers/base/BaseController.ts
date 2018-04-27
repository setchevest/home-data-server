import * as express from "express";
import IBaseController from "../interfaces/base/IBaseController";
import IBaseBusiness from "../../app/business/interfaces/base/IBaseBusiness";

export default class BaseController {

    public static create<T>(business: IBaseBusiness<T>, req: express.Request, res: express.Response): void {
        try {

            var entity: T = <T>req.body;
            business.create(entity, (error, result) => {
                if (error) res.send({ "error": error.message });
                else res.send({ "success": result });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    public static update<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        try {
            var entity: T = <T>req.body;
            var _id: string = req.params._id;
            business.update(_id, entity, (error, result) => {
                if (error) res.send({ "error": error.message });
                else res.send({ "success": result });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }
    public static delete<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            business.delete(_id, (error, result) => {
                if (error) res.send({ "error": error.message });
                else res.send({ "success": result });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    public static retrieve<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        try {
            business.retrieve((error, result) => {
                if (error) res.send({ "error": error.message });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    public static findById<T>(business: IBaseBusiness<T>,req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            business.findById(_id, (error, result) => {
                if (error) res.send({ "error": error.message });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    private static processRequest(fn:()=>void):void{
        
    }

}
