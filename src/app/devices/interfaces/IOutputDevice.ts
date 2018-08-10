export default interface IOutputDevice {
    getData(data: any): Promise<any>;
}