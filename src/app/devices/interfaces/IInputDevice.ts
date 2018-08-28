export default interface IInputDevice {
    setData(data: Object): Promise<any>;
}

export function isInputDevice(object: any): object is IInputDevice {
    return 'setData' in object;
}