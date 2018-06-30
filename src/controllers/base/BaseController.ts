import * as express from "express";
import IBaseBusiness from "../../app/business/interfaces/base/IBaseBusiness";
import IReadController from "../interfaces/IReadController";
import IWriteController from "../interfaces/IWriteController";
import autobind from "autobind-decorator";

@autobind
export default class BaseController<T> implements IReadController, IWriteController {

    private _business: IBaseBusiness<T>;
    protected get business(): IBaseBusiness<T> {
        return this._business;
    }

    /**
     *
     */
    constructor(business: IBaseBusiness<T>) {
        
        this._business = business;        
    }

    public create(req: express.Request, res: express.Response): void {

        var self = this;
        this.processRequest(req,res,()=>{
            var entity: T = <T>req.body;
            self.business.create(entity, (error, result) => {
                if (error) res.send(self.createErrorResponse(error));
                else res.send(self.createSuccessResponse(result));
            });
        });
    }

    public update(req: express.Request, res: express.Response): void {
        var self = this;
        this.processRequest(req,res,()=>{
            var entity: T = <T>req.body;
            var _id: string = req.params._id;
            self.business.update(_id, entity, (error, result) => {
                if (error) res.send(self.createErrorResponse(error));
                else res.send(self.createSuccessResponse(result));
            });
        });
    }

    public delete(req: express.Request, res: express.Response): void {
        var self = this;
        this.processRequest(req,res,()=>{
            var _id: string = req.params._id;
            self.business.delete(_id, (error, result) => {
                if (error) res.send(self.createErrorResponse(error));
                else res.send(self.createSuccessResponse(result));
            });
        });
    }

    public retrieve(req: express.Request, res: express.Response): void {
        var self = this;
        this.processRequest(req,res,()=>{
            self.business.retrieve((error, result) => {
                if (error) res.send(self.createErrorResponse(error));
                else res.send(self.createSuccessResponse(result));
            });
        });
    }
    
    public findById(req: express.Request, res: express.Response): void {
        var self = this;
        this.processRequest(req,res,()=>{
            var _id: string = req.params._id;
            self.business.findById(_id, (error, result) => {
                if (error) res.send(self.createErrorResponse(error));
                else res.send(self.createSuccessResponse(result));
            });
        });
    }

    protected processRequest(req: express.Request, res: express.Response, fn:()=>void): void{
        try {
            fn();
        }
        catch (e) {
            console.log(e);
            res.send(this.createErrorResponse(e));
        }
    }

    protected createErrorResponse(error: any): any {
        return { status: "error", error: "An error has occured", errorMessage: error.message };
    }

    protected createSuccessResponse(data: any): any {
        return { status: "success", data: data };
    }

}
