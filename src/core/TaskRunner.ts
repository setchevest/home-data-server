import { ProcessEvents } from './ProcessEvents';

import IProcess from './intefaces/IProcess';
import ThermostatBusiness from '../app/business/ThermostatBusiness';
import autobind from 'autobind-decorator';
import logger from './Logger';
import * as schedule from 'node-schedule';
import ITaskModel from '../app/model/interfaces/ITaskModel';
import IRepository from '../app/repository/interfaces/IRepository';
import ITimeTriggerModel from '../app/model/interfaces/ITimeTriggerModel';
import { injectable, inject } from 'inversify';
import { IFunctionActionModel } from '../app/model/interfaces/IFunctionActionModel';
import { IMessageBroker, IMessagePayload } from './intefaces/IMessageBroker';

export enum JobEvents {
    started = 'runned',
    finnidhed = 'finnished',
    error = 'error',
    info = 'info',
}

@injectable()
export default class TaskRunner implements IProcess {

    get identifier(): string | Symbol {
        return 'TaskRunner';
    }

    constructor(
        @inject('IMessageBroker') private messageBroker: IMessageBroker,
        @inject('ThermostatBusiness') private thermostatBusiness: ThermostatBusiness,
        @inject('IRepository<ITaskModel>') private taskRepo: IRepository<ITaskModel>) {
    }

    @autobind
    public start(): Promise<boolean> {
        this.messageBroker.subscribe(ProcessEvents.taskChanged, this.configurationChanged);
        return this.load();
    }

    @autobind
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.messageBroker.unsubscribe(ProcessEvents.taskChanged, this.configurationChanged);
            this.cancelAllJobs();
            resolve(true);
        });
    }

    @autobind
    private load(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.taskRepo.retrieve({ condition: { enabled: true } }).then(tasks => {
                tasks.forEach(task => {
                    let job = schedule.scheduledJobs[String(task._id)];
                    if (job) {
                        this.recheduleTask(job, task);
                    } else {
                        this.scheduleTask(task);
                        job = schedule.scheduledJobs[String(task._id)];
                    }
                    logger.debug(`Job "${task.name}" next execution: `, job.nextInvocation());
                });
                resolve(true);
            })
            .catch(error => logger.error('Retrieving tasks error.', error));
        });
    }


    @autobind
    private configurationChanged(payload: IMessagePayload): void {
        this.cancelAllJobs();
        this.load();
    }

    private scheduleTask(task: ITaskModel) {
        const action: IFunctionActionModel = <IFunctionActionModel>task.action;
        // tslint:disable-next-line:no-eval
        const functionToBeExecuted = eval(action.source)[action.functionName].bind(null, task);

        const job = schedule.scheduleJob(String(task._id), (<ITimeTriggerModel>task.trigger).recurrence,
            () => {
                try {
                    job.emit(JobEvents.started, task);
                    functionToBeExecuted.call(action.parameters);
                    job.emit(JobEvents.finnidhed, task);
                } catch (error) {
                    job.emit(JobEvents.error, error.message);
                }
            },
        ).on(JobEvents.finnidhed, (item) => {
            logger.info(`Job "${task.name}" executed`, job.nextInvocation());
        }).on(JobEvents.error, (error) => {
            logger.error(`Job "${task.name}" error`, error);
        }).on(JobEvents.started, (item) => {
            logger.debug(`Job "${task.name}" started`, item);
        }).on(JobEvents.info, (item) => {
            logger.debug(`Job "${task.name}" info`, item);
        });
    }

    private recheduleTask(job: schedule.Job, task: any): any {
        job.reschedule((<ITimeTriggerModel>task.trigger).recurrence);
        logger.debug(`Job "${task.name}" reescheduled.`);
    }

    private cancelAllJobs() {
        for (const key in schedule.scheduledJobs) {
            if (schedule.scheduledJobs.hasOwnProperty(key)) {
                const element = schedule.scheduledJobs[key];
                element.cancel(true);
            }
        }
    }

    @autobind
    private getStatus(context): void {
        this.thermostatBusiness.getStatus().then(value => {
            context.lastResult = value;
        }).catch(error => logger.error('Get Status error.', error));
    }

    @autobind
    private thermostatOn(context): void {
        this.thermostatBusiness.setPower(true).then(value => {
            context.lastResult = value;
        }).catch(error => logger.error('Thermostat on error.', error));
    }

    @autobind
    private thermostatOff(context): void {
        this.thermostatBusiness.setPower(false).then(value => {
            context.lastResult = value;
        }).catch(error => logger.error('Thermostat off error.', error));
    }
}
