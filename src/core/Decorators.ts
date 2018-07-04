//import BaseRoutes from "../config/routes/base/BaseRoutes";

export function apiController<T extends {new(...args:any[]):{}}>(constructor:T) {
    //BaseRoutes.routes.use();
    // console.log("Api controller: %s", constructor.name);
    // Object.keys(constructor.prototype).forEach(element => {
    //     console.log("Api action: %s", element);
    // });
}

export function apiAction(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
    // console.log("ACTION: ", target);
    // target[key] = target[key].bind(target);
}

export function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
