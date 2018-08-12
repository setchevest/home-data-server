export default interface IInputDevice {
    setData(data: any): Promise<any>;
}

export function isInstanceOfInputDevice(object: any): object is IInputDevice {
    return 'setData' in object;
}