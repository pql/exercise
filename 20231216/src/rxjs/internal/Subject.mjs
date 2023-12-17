import { Subscriber } from './Subscriber.mjs'
export class Subject extends Subscriber {
    observers = [];
    subscribe(subscriber) {
        const { observers } = this;
        observers.push(subscriber);
    }
    next(value) {
        const copy = this.observers.slice();
        for (const observer of copy) {
            observer.next(value);
        }
    }
    complete() {
        const { observers } = this;
        while (observers.length) {
            observers.shift().complete?.();
        }
    }
}