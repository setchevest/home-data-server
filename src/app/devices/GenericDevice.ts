import BaseDevice from './base/BaseDevice';

export default class GenericDevice extends BaseDevice {
    
    public setConfig(config: Map<string, any>): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            super.setConfig(config)
            .then(val => {
                const features = config.get('features');
                if (features && features instanceof Array) {
                    features.forEach(element => {
                        if (element.type && typeof element.type === 'string' 
                        && element.actions && element.actions instanceof Array) {
                            element.actions.forEach(action => {
                                this.addFeature(`${element.type}_${action}`, (...args: Array<any>) => {
                                    return Promise.resolve(`Executed ${element.type}_${action}`);
                                });
                            });    
                        }
                    });
                }
            })
            .catch(reject);
        });
    }

    public addFeature(featureName: string, feature?: (...args: Array<any>) => Promise<any>) {
        this[featureName] = feature;
    }
}