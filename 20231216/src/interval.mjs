import { interval } from './rxjs/index.mjs';

interval(1000).subscribe((v) => console.log(v));