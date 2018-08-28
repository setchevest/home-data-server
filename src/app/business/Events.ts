export namespace Events {

    export interface IIncommingWildcard { 
        readonly any: string;
        readonly all: string;
        readonly value: IIncommingWildcard;
    }

    export interface IIncommingEvents<T> { 
        readonly all: T; 
        readonly init: T; 
        readonly config: T; 
        readonly status: T;
        use(value: string): IIncommingEvents<string>;
        asRegExp(): IIncommingEvents<RegExp>;
    }

    export interface IOutgoingEvents<T> extends IIncommingEvents<T> { 
        
    }

    export class Task {
        private static root: string = 'task';
        static readonly Changed: string = Task.root + '/updated';
    }

    export class Device {
        static root: string = 'device';

        static readonly Changed: string = Device.root + '/updated';

        public static incomming: IIncommingEvents<any> = incomingBuilder('+');

        public static outgoing: IOutgoingEvents<any> = outgoingBuilder('#NAME#');
    }


    function incomingBuilder<T>(value: string, regexp: boolean = false): any {
        
        const result = {
            all:  getValue('/out/#', regexp),
            init: getValue('/out/' + value + '/init', regexp),
            status: getValue('/out/' + value + '/status', regexp),
            config: getValue('/iout/' + value + '/config', regexp),
            use: (resultValue: string) => {
                return incomingBuilder<string>(resultValue, regexp);
            },
            asRegExp: function() {
                return incomingBuilder<RegExp>(value, true);
            },
        };
        return result;
    }

    function outgoingBuilder(value: string, regexp: boolean = false): any {

        const result = {
            all: getValue('/in/#', regexp),
            init: getValue('/in/' + value + '/init', regexp),
            status: getValue('/in/' + value + '/status', regexp),
            config: getValue('/in/' + value + '/config', regexp),
            use: (resultValue: string) => {
                return outgoingBuilder(resultValue, regexp);
            },
            asRegExp: () => {
                return outgoingBuilder(value, true);
            },
        };
        return result;
    }

    function getValue(value: string, regexp: boolean) {
        value = Device.root + value;
        if  (regexp)
            return new RegExp(value.replace('+', '([\\w\\s]+)').replace('#', '(.*)'));
        else
            return value;
    }
}


