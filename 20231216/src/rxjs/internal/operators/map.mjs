import { Observable } from "../Observable.mjs"

export function map(project) {
    return source => {
        const observable = new Observable(function (subscriber) {
            return source.subscribe({
                ...subscriber,
                next: value => {
                    subscriber.next(project(value));
                }
            });
        });
        return observable;
    }
}