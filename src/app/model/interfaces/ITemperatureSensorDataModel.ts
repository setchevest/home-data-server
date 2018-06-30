import ISensorDataModel from "./ISensorDataModel";

export default interface ITemperatureSensorDataModel extends ISensorDataModel {
  temperature: number;
  humidity: number;
}
