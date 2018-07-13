import * as express from 'express';

export default class DefaultRoutes {
    constructor() {
        
    }
    public get routes() {
        const router = express.Router();
        router.route('/*').get(
            (req: express.Request, res: express.Response, next: express.NextFunction) => {
                // redirect to root. In case static folder is set and Index.html exists, will show that file
                res.redirect('./');
                // let rootPath = path.join(__dirname, "/Static");
                // res.sendFile('index.html', {root: rootPath});
            },
        );

        return router;
    }
}
