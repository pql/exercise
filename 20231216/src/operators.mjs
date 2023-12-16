import { of, map, filter } from "./rxjs/index.mjs"
const subscriber = of(1, 2, 3)
    .pipe(map(val => val * 2))
    .pipe(filter(val => val > 3))
    .pipe(map(data => data + 1))
subscriber.subscribe(console.log)