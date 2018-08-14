export default interface IInputDevice {
    setData(data: Object): Promise<any>;
}

export function isInstanceOfInputDevice(object: any): object is IInputDevice {
    return 'setData' in object;
}