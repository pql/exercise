import { Observable } from "../Observable.mjs";

export function take(count) {
    return source => {
        let seen = 0;
        const observable = new Observable(function (subscriber) {
            return source.subscribe({
                ...subscriber,
                next: (value) => {
                    seen++;
                    if (seen <= count) {
                        subscriber.next(value);
                        if (seen >= count) {
                            subscriber.complete();
                        }
                    }
                }
            })
        });
        return observable;
    }
}