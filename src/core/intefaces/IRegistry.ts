export default interface IRegistry<TKey, TValue> {
    register(key: TKey, value: TValue);
    get(key: TKey): TValue;
}