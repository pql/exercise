import { fromEvent } from './rxjs/index.mjs'

const source = fromEvent(document, 'click');
const subscriber = source.subscribe(console.log)
setTimeout(() => {
    subscriber.unsubscribe();
}, 1000);