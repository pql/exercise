import { timer } from './rxjs/index.mjs';

timer(1000).subscribe(() => console.log('timer'));