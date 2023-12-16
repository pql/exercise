import { Observable } from './rxjs/index.mjs';
const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
});

observable.subscribe({
    next: value => console.log('next value:', value),
    complete: () => {
        console.log('complete');
    }
})
observable.subscribe(value => console.log('next value:', value))