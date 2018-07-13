const greaterOrEqual = (n: number)  => {
    return (target: Object, key: string | symbol) => {
        let value = target[key];
 
        const getter = () =>  value;
        const setter = (val) => {
            if (val < n) {
                throw new Error(`Value smaller than ${n}`);
            }
            value = val;
        };
        Reflect.deleteProperty[key];
        Reflect.defineProperty(target, key, {
            get: getter,
            set: setter,
        });
    };
};

export default greaterOrEqual;
