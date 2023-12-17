import { interval, take } from "./rxjs/index.mjs";
interval(500)
    .pipe(take(3))
    .subscribe(console.log);
// 0
// 1
// 2