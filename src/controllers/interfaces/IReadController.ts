import * as express from 'express';

export default interface ReadController {
    retrieve: express.RequestHandler;
    retrieveMany: express.RequestHandler;
    findById: express.RequestHandler;   
}
