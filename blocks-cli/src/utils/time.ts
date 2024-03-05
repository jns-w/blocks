
import {TimeObject} from "@types";

import {
  differenceInMilliseconds,
  hoursToMilliseconds,
  millisecondsToHours,
  startOfDay as getStartOfDay
} from "date-fns";

export const getWorkDay = (timestamp: EpochTimeStamp, dayStartsAt: Number): Date => {
  const timeOfDay = getTimeOfDay(timestamp);
  // if this is before start time -- identify as prev work day
  if (timeOfDay < dayStartsAt) {
    const workDay = getStartOfDay(timestamp-hoursToMilliseconds(24));
    return workDay
  }
  // else - identify as today
  const workDay = getStartOfDay(timestamp)
  return workDay;
}

export const getTimeOfDay = (timestamp: EpochTimeStamp): Number => {
  const startOfDay = getStartOfDay(timestamp);
  const time = differenceInMilliseconds(timestamp, startOfDay)
  // console.log("time is", millisecondsToHours(time))

  return time;
}


export const padded = (num: number, paddingCount: number): string => {
    const numLength = num.toString().length
    if (numLength < paddingCount) {
        let numberStr = num.toString()
        for (let i = 0; i < paddingCount - numLength; i++) {
            numberStr = "0" + numberStr
        }
        return numberStr
    }
    return num.toString()
}

export const secondsToMinSec = (time: number, text?: boolean): string => {
    let minutes = Math.floor(time / 60)
    let seconds = parseInt((time % 60).toFixed(0))

    if (seconds == 60) {
        seconds = 0
        minutes += 1;
    }
    if (text) return minutes + "m" + padded(seconds, 2) + "s"; else
        return minutes + ":" + padded(seconds, 2);
}

export const secondsToHourMinSec = (time: number, text?: boolean): string => {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time % 3600) / 60)
    let seconds = parseInt((time % 3600 % 60).toFixed(0))

    if (seconds == 60) {
        seconds = 0
        minutes += 1;
    }

    if (minutes == 60) {
        minutes = 0
        hours += 1
    }
    if (text) return hours + "h" + padded(minutes, 2) + "m";
    return hours + ":" + padded(minutes, 2) + ":" + padded(seconds, 2)
}

export const stringTime = (time: number, showHour?: boolean): string => {
    if (showHour || time >= 3600) return secondsToHourMinSec(time); else return secondsToMinSec(time)
}

export const stringTimeWithText = (time: number): string => {
    if (time < 60) return padded(time, 2) + "s";
    if (time >= 3600) return secondsToHourMinSec(time, true);
    return secondsToMinSec(time, true)
}

export const secondsToObject = (time: number) : TimeObject => {
    let hoursNum = Math.floor(time / 3600)
    let minutesNum = Math.floor((time % 3600) / 60)
    let secondsNum = parseInt((time % 3600 % 60).toFixed(0))

    if (secondsNum == 60) {
        secondsNum = 0
        minutesNum += 1;
    }

    if (minutesNum == 60) {
        minutesNum = 0
        hoursNum += 1
    }

    const hours = padded(hoursNum, 2)
    const minutes = padded(minutesNum, 2)
    const seconds = padded(secondsNum, 2)

    return {hours, minutes, seconds}
}

export const objectToSeconds = (obj: TimeObject) : string => {
  const hours = parseInt(obj.hours)
  const min = parseInt(obj.minutes)
  const sec = parseInt(obj.seconds)

  return (hours*3600 + min*60 + sec).toString()
}
