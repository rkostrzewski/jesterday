import fromJS from './fromJS'
import toJS from './toJS'
import { DATE_PARTS } from './enums'

/**
 * Returns starting point of given time interval based on passed date.
 * @example
 * // returns { ..., hours: 19, minutes: 0, seconds: 0, milliseconds: 0 }
 * startOf('hour', { hours: 19, minutes: 55, seconds: 45 })
 * @example
 * // returns { ..., month: 3, day: 1, hours: 0, minutes: 0, ... }
 * starOf('month', { month: 3, day: 20, hours: 5 })
 * @param  {string}         part  Date part.
 * @param  {jesterday.Date} date  Base date.
 * @return {jesterday.Date}       Starting point of given time interval.
 */
export default function startOf (part, date) {
  const jsDate = toJS(date)
  switch (part) {
    case DATE_PARTS.second:
      jsDate.setUTCMilliseconds(0)
      break
    case DATE_PARTS.minute:
      jsDate.setUTCSeconds(0, 0)
      break
    case DATE_PARTS.hour:
      jsDate.setUTCMinutes(0, 0, 0)
      break
    case DATE_PARTS.day:
      jsDate.setUTCHours(0, 0, 0, 0)
      break
    case DATE_PARTS.week:
      jsDate.setUTCHours(0, 0, 0, 0)
      jsDate.setUTCDate(jsDate.getUTCDate() - jsDate.getUTCDay())
      break
    case DATE_PARTS.month:
      jsDate.setUTCMonth(jsDate.getUTCMonth())
      jsDate.setUTCDate(1)
      jsDate.setUTCHours(0, 0, 0, 0)
      break
    case DATE_PARTS.year:
      jsDate.setUTCFullYear(jsDate.getUTCFullYear())
      jsDate.setUTCMonth(0)
      jsDate.setUTCDate(1)
      jsDate.setUTCHours(0, 0, 0, 0)
      break
    default:
      return
  }

  return fromJS(jsDate, date.timezoneOffset)
}
