import { asyncScheduler } from "../scheduler/async.mjs";
import { timer } from "./timer.mjs";

export function interval(period = 0, scheduler = asyncScheduler) {
    return timer(period, period, scheduler);
}