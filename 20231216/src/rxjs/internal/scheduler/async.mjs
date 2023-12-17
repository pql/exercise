import { AsyncAction } from './AsyncAction.mjs';
import { Scheduler } from '../Scheduler.mjs';

export const asyncScheduler = new Scheduler(AsyncAction);