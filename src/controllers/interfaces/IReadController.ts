import * as express from 'express';

export default interface ReadController {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;   
}
