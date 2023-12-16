import { from } from './from.mjs'
export function of(...args) {
    return from(args);
}