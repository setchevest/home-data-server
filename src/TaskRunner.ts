import IProcess from "./core/IProcess";
import ThermostatBusiness from "./app/business/ThermostatBusiness";
import autobind from "autobind-decorator";
import logger from "./core/Logger";
import * as schedule from 'node-schedule'
import ITaskModel from './app/model/interfaces/ITaskModel';
import IRepository from "./app/repository/interfaces/IRepository";
import ITimeTriggerModel from "./app/model/interfaces/ITimeTriggerModel";
import { injectable, inject } from "inversify";
import { EventEmitter } from "events";

export enum jobEvents {
    started = "runned",
    finnidhed = "finnidhed",
    error = "error",
}
@injectable()
export default class TaskRunner implements IProcess {

    private jobs: string[] = [];

    get identifier(): string | Symbol {
        return "TaskRunner";
    }

    constructor(@inject("ThermostatBusiness") private thermostatBusiness: ThermostatBusiness,
        @inject("IRepository<ITaskModel>") private taskRepo: IRepository<ITaskModel>) {

    }

    @autobind
    public start(events: EventEmitter): Promise<boolean> {
        events.removeListener("configChanged", this.configurationChanged)
            .on("configChanged", this.configurationChanged);

        return this.load();
    }

    @autobind
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.jobs.forEach(job => {
                schedule.scheduledJobs[job].cancel(true);
            });
            resolve(true);
        });
    }

    @autobind
    private load(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.taskRepo.retrieve().then(tasks => {
                tasks.forEach(task => {
                    let job = schedule.scheduledJobs[task.name];
                    if (job) {
                        job.reschedule(task.action);
                    } else {
                        this.scheduleTask(task);
                    }
                });
            }).then(() => resolve(true));
        });
    }
    
    @autobind
    private configurationChanged(): void {
        this.load();
    }

    private scheduleTask(task: ITaskModel) {
        let job = schedule.scheduleJob(task.name, (<ITimeTriggerModel>task.trigger).recurrence,
            () => {
                try {
                    job.emit(jobEvents.started, task);
                    this[task.action].bind(null, task).call();
                    job.emit(jobEvents.finnidhed, task);
                } catch (error) {
                    job.emit(jobEvents.error, error);
                }
            }
        ).on(jobEvents.finnidhed, (task) => {
            logger.debug('Job next execution: ', job.name, job.nextInvocation())
            logger.info("Job executed", task);
        }).on(jobEvents.error, (task) => {
            logger.error("Job error", task);
        }).on(jobEvents.started, (task) => {
            logger.debug("Job started", task);
        });
        logger.debug('Job next execution: ', job.name, job.nextInvocation())
        this.jobs.push(task._id);
    }

    @autobind
    private getStatus(context): void {
        this.thermostatBusiness.getStatus().then(value => {
            context.lastResult = value;
        });
    }

    @autobind
    private thermostatOn(context): void {
        this.thermostatBusiness.setPower(true).then(value => {
            context.lastResult = value;
        });
    }

    @autobind
    private thermostatOff(context): void {
        this.thermostatBusiness.setPower(false).then(value => {
            context.lastResult = value;
        });
    }
}