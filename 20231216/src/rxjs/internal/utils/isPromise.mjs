import { isFunction } from "./isFunction.mjs";

export function isPromise(value) {
    return isFunction(value?.then);
}