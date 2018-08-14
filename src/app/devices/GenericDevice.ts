import BaseDevice from './base/BaseDevice';

export default class GenericDevice extends BaseDevice {
    constructor(name: string) {
        super(name);
    }

    public addFeature(featureName: string, feature?: (...args: Array<any>) => Promise<any>) {
        this[featureName] = feature;
    }

    public addUrlFeature(featureName: string, feature?: (...args: Array<any>) => Promise<any>) {
        this[featureName] = feature;
    }
}