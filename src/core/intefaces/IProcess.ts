export default interface IProcess {
    identifier: string | Symbol ;
    start(): Promise<boolean>;
    stop(): Promise<boolean>;
}

