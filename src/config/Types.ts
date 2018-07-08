import IBaseBusiness from "../app/business/interfaces/base/IBaseBusiness";
import IThermostatModel from "../app/model/interfaces/IThermostatModel";
import ThermostatBusiness from "../app/business/ThermostatBusiness";
import IRepository from "../app/repository/interfaces/IRepository";
import ThermostatRepository from "../app/repository/ThermostatRepository";
import IThermostatDevice from "../app/devices/interfaces/IThermostatDevice";
import ArduinoThermostat from "../app/devices/ArduinoThermostat";

let TYPES = {
    IThermostatDevice: ArduinoThermostat,
    IRepository_IThermostatModel: ThermostatBusiness
};

export default TYPES;