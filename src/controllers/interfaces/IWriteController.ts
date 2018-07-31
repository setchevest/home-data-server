import {RequestHandler} from 'express';

export default interface WriteController {
    create: RequestHandler;
    update: RequestHandler;
    delete: RequestHandler;
    
}
