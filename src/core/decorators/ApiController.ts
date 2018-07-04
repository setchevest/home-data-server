import BaseRoutes from "../../config/routes/base/BaseRoutes";

const apiController = (controllerName: string)  => {
    return <T extends {new(...args:any[]):{}}>(constructor:T) => {
        //BaseRoutes.routes.use(controllerName, null );
        console.log("Api controller: %s", constructor.name);
        Object.keys(constructor.prototype).forEach(element => {
            console.log("Api action: %s", element);
        });
    }
};

export default apiController;