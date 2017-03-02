import fromJS from './fromJS'
import toJS from './toJS'

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
  let jsDate
  switch (part) {
    case 'second':
      jsDate = toJS(date)
      jsDate.setUTCMilliseconds(0)
      break
    case 'minute':
      jsDate = toJS(date)
      jsDate.setUTCSeconds(0, 0)
      break
    case 'hour':
      jsDate = toJS(date)
      jsDate.setUTCMinutes(0, 0, 0)
      break
    case 'day':
      jsDate = toJS(date)
      jsDate.setUTCHours(0, 0, 0, 0)
      break
    case 'month':
      jsDate = toJS(date)
      jsDate.setUTCMonth(jsDate.getUTCMonth())
      jsDate.setUTCDate(1)
      jsDate.setUTCHours(0, 0, 0, 0)
      break
    case 'year':
      jsDate = toJS(date)
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
