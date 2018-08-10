export default interface IEventEmitterDevice {
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}