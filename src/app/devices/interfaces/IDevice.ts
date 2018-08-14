export default interface IDevice extends Object {
    name(): string;
    setConfig(config: Map<string, any>): Promise<boolean>;
    getData(query: Object): Promise<any>;
}

