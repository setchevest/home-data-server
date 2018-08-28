import IDeviceModel from './IDeviceModel';
export default interface IThermostatDeviceModel extends IDeviceModel {

}

export function isThermostatDeviceModel(object: IDeviceModel): object is IThermostatDeviceModel {
    return 'type' in object && object['type'] === 'Thermostat';
}