import {differenceInMilliseconds, hoursToMilliseconds} from "date-fns";


export * from "./handlers"
export * from './storage'
export * from './api'
export * from './time'
export * from './socket'
export * from './auth'

export const wait = (ms: number) => new Promise(
  (resolve, reject) => setTimeout(resolve, ms)
);

export const isWork = (activity: string): boolean => {
  const chillActivities = ['Gaming', 'Break', 'Meal Break']
  return !chillActivities.includes(activity)
}

export const isWithin24Hours = (timestamp: number): boolean => {
  const difference = differenceInMilliseconds(Date.now(),timestamp);
  return difference <= hoursToMilliseconds(24);
}

export const isDev = () : boolean => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}
