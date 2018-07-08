import * as express from "express";
import IBaseBusiness from "../../app/business/interfaces/base/IBaseBusiness";
import autobind from "autobind-decorator";
import logger from "../../core/Logger";
import IBaseController from "../interfaces/IBaseController";
import { httpGet, httpPost, httpPut, httpDelete, request, response } from "inversify-express-utils";
import { injectable } from "inversify";

@autobind
@injectable()
export default class BaseController<T> implements IBaseController<T> {

    private _business: IBaseBusiness<T>;
    protected get business(): IBaseBusiness<T> {
        return this._business;
    }

    constructor(business: IBaseBusiness<T>) {
        this._business = business;
    }

    @httpPost("/")
    public create(@request() req: express.Request, @response() res: express.Response): any {
        var entity: T = <T>req.body;
        return this.processRequest(this.business.create(entity));
    }

    @httpPut("/:_id")
    public update(@request() req: express.Request, @response() res: express.Response): any {

        var entity: T = <T>req.body;
        var _id: string = req.params._id;
        return this.processRequest(this.business.update(_id, entity));
    }

    @httpDelete("/:_id")
    public delete(@request() req: express.Request, @response() res: express.Response): any {
        var _id: string = req.params._id;
        return this.processRequest(this.business.delete(_id));
    }

    @httpGet("/")
    public retrieve(@request() req: express.Request, @response() res: express.Response): any {
        return this.processRequest(this.business.retrieve());
    }

    @httpGet("/byid/:_id")
    public findById(@request() req: express.Request, @response() res: express.Response): any {

        var _id: string = req.params._id;
        return this.processRequest(this.business.findById(_id));
    }

    protected processRequest(promise: Promise<any>): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                promise.then(item => resolve(this.createSuccessResponse(item)))
                    .catch(item => reject(this.createErrorResponse(item)));
            }
            catch (e) {
                logger.error(e);
                reject(this.createErrorResponse(e));
            }
        });
    }

    protected createErrorResponse(error: any): any {
        return { status: "error", error: "An error has occured", errorMessage: error.message, errorDetails: error.stack };
    }

    protected createSuccessResponse(data: any): any {
        return { status: "success", data: data };
    }

}