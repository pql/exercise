import { isFunction } from './utils/isFunction.mjs'
import { Subscription } from './Subscription.mjs';

export class Subscriber extends Subscription {
    isStopped = false;
    constructor(observerOrNext) {
        super();
        let observer;
        if (isFunction(observerOrNext)) {
            observer = {
                next: observerOrNext
            }
        } else {
            observer = observerOrNext
        }
        this.destination = observer;
    }
    next(value) {
        if (!this.isStopped) {
            this.destination.next(value);
        }
    }
    complete() {
        if (!this.isStopped) {
            this.isStopped = true;
            this.destination.complete?.();
        }
    }
}