import { Observable } from "../Observable.mjs";

export function filter(predicate) {
    return source => {
        const observable = new Observable(function (subscriber) {
            return source.subscribe({
                ...subscriber,
                next: value => {
                    predicate(value) && subscriber.next(value);
                }
            });
        });
        return observable;
    }
}