export enum EventKeys {
    PRICE_CHANGE,
}
export type Listener = () => void;
export default class EventEmitter {
    static listeners: { [key in EventKeys]: Listener[] } = {
        [EventKeys.PRICE_CHANGE]: [],
    };

    static registerListener(key: EventKeys, listener: Listener) {
        this.listeners[key].push(listener);
    }

    static dispatchEvent(key: EventKeys) {
        this.listeners[key].forEach((listener) => listener());
    }

    static removeListener(key: EventKeys, listener: Listener) {
        this.listeners[key] = this.listeners[key].filter(
            (list) => list !== listener
        );
    }
}
