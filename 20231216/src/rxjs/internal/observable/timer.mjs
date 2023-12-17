import { Observable } from "../Observable.mjs";
import { asyncScheduler } from "../scheduler/async.mjs";

export function timer(dueTime = 0, interval, scheduler = asyncScheduler) {
    return new Observable(subscriber => {
        let n = 0;
        return scheduler.schedule(function () {
            subscriber.next(n++);
            if (interval >= 0) {
                this.schedule(undefined, interval);
            } else {
                subscriber.complete();
            }
        }, dueTime);
    });
}