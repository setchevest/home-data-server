import 'reflect-metadata';
import { Types } from './Types';
import { Container } from 'inversify';
import IBaseBusiness from '../app/business/interfaces/base/IBaseBusiness';
import IThermostatModel from '../app/model/interfaces/IThermostatModel';
import ThermostatBusiness from '../app/business/ThermostatBusiness';
import IRepository from '../app/repository/interfaces/IRepository';
import ThermostatRepository from '../app/repository/ThermostatRepository';
import IThermostatDevice from '../app/devices/interfaces/IThermostatDevice';
import ArduinoThermostat from '../app/devices/ArduinoThermostat';
import IZoneModel from '../app/model/interfaces/IZoneModel';
import ZoneRepository from '../app/repository/ZoneRepository';
import { TemperatureSensorDataRepository } from '../app/repository/TemperatureSensorDataRepository';
import ITemperatureSensorDataModel from '../app/model/interfaces/ITemperatureSensorDataModel';
import TemperatureSensorDataBusiness from '../app/business/TemperatureSensorDataBusiness';
import ZoneBusiness from '../app/business/ZoneBusiness';
import ITaskModel from '../app/model/interfaces/ITaskModel';
import TaskRepository from '../app/repository/TaskRepository';
import IProcess from '../core/intefaces/IProcess';
import TaskRunner from '../core/TaskRunner';
import WebServer from '../core/WebServer';
import IAppConfig from './IAppConfig';
import {AppConfig} from './AppConfig';
import TaskBusiness from '../app/business/TaskBusiness';
import ITimeTriggerModel from '../app/model/interfaces/ITimeTriggerModel';
import TimeTriggerBusiness from '../app/business/TimeTriggerBusiness';
import { IFunctionActionModel } from '../app/model/interfaces/IFunctionActionModel';
import FunctionActionBusiness from '../app/business/FunctionActionBusiness';
import TimeTriggerRepository from '../app/repository/TimeTriggerRepository';
import FunctionActionRepository from '../app/repository/FunctionActionRepository';
import ProcessManager from '../core/ProcessManager';
import { IMessageBroker } from '../core/intefaces/IMessageBroker';
import { IProcessManager } from '../core/intefaces/IProcessManager';
import IActionModel from '../app/model/interfaces/IActionModel';
import ActionRepository from '../app/repository/ActionRepository';
import ActionBusiness from '../app/business/ActionBusiness';
import { IHttpActionModel } from '../app/model/interfaces/IHttpActionModel';
import HttpActionBusiness from '../app/business/HttpActionBusiness';
import HttpActionRepository from '../app/repository/HttpActionRepository';
import IDeviceModel from '../app/model/interfaces/IDeviceModel';
import DeviceRepository from '../app/repository/DeviceRepository';
import DeviceBusiness from '../app/business/DeviceBusiness';
import IDeviceFactory from '../app/devices/interfaces/IDeviceFactory';
import DeviceFactory from '../app/devices/DeviceFactory';
import IDeviceBusiness from '../app/business/interfaces/IDeviceBusiness';
import DeviceRegistry from '../app/devices/DeviceRegistry';
import IRegistry from '../core/intefaces/IRegistry';
import IDevice from '../app/devices/interfaces/IDevice';
import FakeArduinoThermostat from '../app/devices/FakeArduinoThermostat';

const container = new Container(
    {
        autoBindInjectable: true,
        skipBaseClassChecks: true,
    });

container.bind<IAppConfig>(Types.IAppConfig).to(AppConfig).inSingletonScope();
container.bind<IDeviceFactory>(Types.IDeviceFactory).to(DeviceFactory).inSingletonScope();
container.bind<IRegistry<String, IDevice>>(Types.IRegistry_String_IDevice).to(DeviceRegistry).inSingletonScope();

container.bind<IThermostatDevice>(Types.IThermostatDevice).to(FakeArduinoThermostat);

container.bind<IRepository<ITemperatureSensorDataModel>>(Types.IRepository_ITemperatureSensorDataModel).to(TemperatureSensorDataRepository).inRequestScope();
container.bind<IRepository<IZoneModel>>(Types.IRepository_IZoneModel).to(ZoneRepository).inRequestScope();
container.bind<IRepository<IThermostatModel>>(Types.IRepository_IThermostatModel).to(ThermostatRepository).inRequestScope();
container.bind<IRepository<ITaskModel>>(Types.IRepository_ITaskModel).to(TaskRepository).inSingletonScope();
container.bind<IRepository<ITimeTriggerModel>>(Types.IRepository_ITimeTriggerModel).to(TimeTriggerRepository).inRequestScope();
container.bind<IRepository<IFunctionActionModel>>(Types.IRepository_IFunctionActionModel).to(FunctionActionRepository).inRequestScope();
container.bind<IRepository<IActionModel>>(Types.IRepository_IActionModel).to(ActionRepository).inRequestScope();
container.bind<IRepository<IHttpActionModel>>(Types.IRepository_IHttpActionModel).to(HttpActionRepository).inRequestScope();
container.bind<IRepository<IDeviceModel>>(Types.IRepository_IDeviceModel).to(DeviceRepository).inSingletonScope();
container.bind<IBaseBusiness<ITemperatureSensorDataModel>>(Types.IBaseBusiness_ITemperatureSensorDataModel).to(TemperatureSensorDataBusiness);
container.bind<IBaseBusiness<IZoneModel>>(Types.IBaseBusiness_IZoneModel).to(ZoneBusiness);
container.bind<IBaseBusiness<IFunctionActionModel>>(Types.IBaseBusiness_IFunctionActionModel).to(FunctionActionBusiness);
container.bind<IBaseBusiness<ITimeTriggerModel>>(Types.IBaseBusiness_ITimeTriggerModel).to(TimeTriggerBusiness);
container.bind<IBaseBusiness<IThermostatModel>>(Types.IBaseBusiness_IThermostatModel).to(ThermostatBusiness);
container.bind<IBaseBusiness<ITaskModel>>(Types.IBaseBusiness_ITaskModel).to(TaskBusiness);
container.bind<IBaseBusiness<IDeviceModel>>(Types.IBaseBusiness_IDeviceModel).to(DeviceBusiness);
container.bind<IDeviceBusiness>(Types.IDeviceBusiness).to(DeviceBusiness);
container.bind<IBaseBusiness<IActionModel>>(Types.IBaseBusiness_IActionModel).to(ActionBusiness);
container.bind<IBaseBusiness<IHttpActionModel>>(Types.IBaseBusiness_IHttpActionModel).to(HttpActionBusiness);
container.bind<ThermostatBusiness>(Types.ThermostatBusiness).to(ThermostatBusiness);

container.bind<IProcessManager>(Types.IProcessManager).to(ProcessManager).inSingletonScope();
container.bind<IMessageBroker>(Types.IMessageBroker).to(ProcessManager).inSingletonScope();
container.bind<IProcess>(Types.IProcess).to(TaskRunner).inSingletonScope();
container.bind<IProcess>(Types.IProcess).to(WebServer).inSingletonScope();

export default container;
