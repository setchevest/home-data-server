import 'reflect-metadata';
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

container.bind<IAppConfig>('IAppConfig').to(AppConfig).inSingletonScope();
container.bind<IDeviceFactory>('IDeviceFactory').to(DeviceFactory).inSingletonScope();
container.bind<IRegistry<String, IDevice>>('IRegistry<String, IDevice>').to(DeviceRegistry).inSingletonScope();
container.bind<IThermostatDevice>('IThermostatDevice').to(ArduinoThermostat);

container.bind<IRepository<ITemperatureSensorDataModel>>('IRepository<ITemperatureSensorDataModel>').to(TemperatureSensorDataRepository).inRequestScope();
container.bind<IRepository<IZoneModel>>('IRepository<IZoneModel>').to(ZoneRepository).inRequestScope();
container.bind<IRepository<IThermostatModel>>('IRepository<IThermostatModel>').to(ThermostatRepository).inRequestScope();
container.bind<IRepository<ITaskModel>>('IRepository<ITaskModel>').to(TaskRepository).inSingletonScope();
container.bind<IRepository<ITimeTriggerModel>>('IRepository<ITimeTriggerModel>').to(TimeTriggerRepository).inRequestScope();
container.bind<IRepository<IFunctionActionModel>>('IRepository<IFunctionActionModel>').to(FunctionActionRepository).inRequestScope();
container.bind<IRepository<IActionModel>>('IRepository<IActionModel>').to(ActionRepository).inRequestScope();
container.bind<IRepository<IHttpActionModel>>('IRepository<IHttpActionModel>').to(HttpActionRepository).inRequestScope();
container.bind<IRepository<IDeviceModel>>('IRepository<IDeviceModel>').to(DeviceRepository).inSingletonScope();
container.bind<IBaseBusiness<ITemperatureSensorDataModel>>('IBaseBusiness<ITemperatureSensorDataModel>').to(TemperatureSensorDataBusiness);
container.bind<IBaseBusiness<IZoneModel>>('IBaseBusiness<IZoneModel>').to(ZoneBusiness);
container.bind<IBaseBusiness<IFunctionActionModel>>('IBaseBusiness<IFunctionActionModel>').to(FunctionActionBusiness);
container.bind<IBaseBusiness<ITimeTriggerModel>>('IBaseBusiness<ITimeTriggerModel>').to(TimeTriggerBusiness);
container.bind<IBaseBusiness<IThermostatModel>>('IBaseBusiness<IThermostatModel>').to(ThermostatBusiness);
container.bind<IBaseBusiness<ITaskModel>>('IBaseBusiness<ITaskModel>').to(TaskBusiness);
container.bind<IBaseBusiness<IDeviceModel>>('IBaseBusiness<IDeviceModel>').to(DeviceBusiness);
container.bind<IDeviceBusiness>('IDeviceBusiness').to(DeviceBusiness);
container.bind<IBaseBusiness<IActionModel>>('IBaseBusiness<IActionModel>').to(ActionBusiness);
container.bind<IBaseBusiness<IHttpActionModel>>('IBaseBusiness<IHttpActionModel>').to(HttpActionBusiness);
container.bind<ThermostatBusiness>('ThermostatBusiness').to(ThermostatBusiness);

container.bind<IProcessManager>('IProcessManager').to(ProcessManager).inSingletonScope();
container.bind<IMessageBroker>('IMessageBroker').to(ProcessManager).inSingletonScope();
container.bind<IProcess>('IProcess').to(TaskRunner).inSingletonScope();
container.bind<IProcess>('IProcess').to(WebServer).inSingletonScope();

export default container;
