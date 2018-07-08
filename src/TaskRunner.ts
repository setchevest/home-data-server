import IProcess from "./core/IProcess";
import ThermostatBusiness from "./app/business/ThermostatBusiness";
import container from "./config/inversify.config";
import autobind from "autobind-decorator";
import logger from "./core/Logger";
import * as schedule from 'node-schedule'
import ITaskModel from './app/model/interfaces/ITaskModel';
import IRepository from "./app/repository/interfaces/IRepository";
import TaskRepository from "./app/repository/TaskRepository";
import ITimeTriggerModel from "./app/model/interfaces/ITimeTriggerModel";

export enum jobEvents {
    started = "runned",
    finnidhed = "finnidhed",
    error = "error",
}

export default class TaskRunner implements IProcess {

    private jobs: string[] = [];

    get identifier(): string | Symbol {
        return "TaskRunner";
    }

    private thermoBs = container.get<ThermostatBusiness>(ThermostatBusiness);
    private taskRepo = container.get<IRepository<ITaskModel>>(TaskRepository);

    constructor() {

    }

    @autobind
    public start(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.taskRepo.retrieve().then(tasks => {
                tasks.forEach(task => {
                    this.scheduleTask(task);
                });
                resolve(true);
            }).then();
        });
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
        schedule.scheduledJobs
        logger.debug('Job next execution: ', job.name, job.nextInvocation())
        this.jobs.push(job.name);
    }

    @autobind
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.jobs.forEach(job => {
                schedule.scheduledJobs[job].cancel(true);
            })
            resolve(true);
        });
    }

    @autobind
    private getStatus(context): void {
        this.thermoBs.getStatus().then(value => {
            context.lastResult = value;
        });
    }

    @autobind
    private thermostatOn(context): void {
        this.thermoBs.setPower(true).then(value => {
            context.lastResult = value;
        });
    }

    @autobind
    private thermostatOff(context): void {
        this.thermoBs.setPower(false).then(value => {
            context.lastResult = value;
        });
    }
}