import IProcess from './IProcess';

export interface IProcessManager {
    add(process: IProcess): IProcessManager;
    runAll(): IProcessManager;
}