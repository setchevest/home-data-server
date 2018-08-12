export default interface IDevice {
    name: string;
    setConfig(config: Map<string, any>): Promise<boolean>;
    getData(query: any): Promise<any>;
}
