import 'reflect-metadata';
import { Container } from 'inversify';

import IBaseBusiness from "../app/business/interfaces/base/IBaseBusiness";
import IThermostatModel from "../app/model/interfaces/IThermostatModel";
import ThermostatBusiness from "../app/business/ThermostatBusiness";
import IRepository from "../app/repository/interfaces/IRepository";
import ThermostatRepository from "../app/repository/ThermostatRepository";
import IThermostatDevice from "../app/devices/interfaces/IThermostatDevice";
import ArduinoThermostat from "../app/devices/ArduinoThermostat";
import TYPES from "./Types";
import IZoneModel from '../app/model/interfaces/IZoneModel';
import ZoneRepository from '../app/repository/ZoneRepository';
import { TemperatureSensorDataRepository } from '../app/repository/TemperatureSensorDataRepository';
import ITemperatureSensorDataModel from '../app/model/interfaces/ITemperatureSensorDataModel';
import TemperatureSensorDataBusiness from '../app/business/TemperatureSensorDataBusiness';
import ZoneBusiness from '../app/business/ZoneBusiness';
import ITaskModel from 'app/model/interfaces/ITaskModel';
import TaskRepository from '../app/repository/TaskRepository';

const container = new Container(
    {
        autoBindInjectable:true,
        skipBaseClassChecks: true
    });

    
container.bind<IBaseBusiness<IThermostatModel>>("IBaseBusiness<IThermostatModel>").to(ThermostatBusiness);
container.bind<IRepository<ITemperatureSensorDataModel>>("IRepository<ITemperatureSensorDataModel>").to(TemperatureSensorDataRepository).inRequestScope();
container.bind<IRepository<IZoneModel>>("IRepository<IZoneModel>").to(ZoneRepository).inRequestScope();
container.bind<IRepository<IThermostatModel>>("IRepository<IThermostatModel>").to(ThermostatRepository).inRequestScope();
container.bind<IRepository<ITaskModel>>("IRepository<ITaskModel>").to(TaskRepository).inRequestScope();
container.bind<IThermostatDevice>("IThermostatDevice").to(ArduinoThermostat).inRequestScope();
container.bind<IBaseBusiness<ITemperatureSensorDataModel>>("IBaseBusiness<ITemperatureSensorDataModel>").to(TemperatureSensorDataBusiness);
container.bind<IBaseBusiness<IZoneModel>>("IBaseBusiness<IZoneModel>").to(ZoneBusiness);



export default container;