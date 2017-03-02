import fromJS from './fromJS'
import toJS from './toJS'
import { DATE_PARTS } from './enums'

 /**
  * Returns ending point of given time interval based on passed date.
  * @example
  * // returns { ..., hours: 19, minutes: 59, seconds: 59, milliseconds: 999 }
  * endOf('hour', { hours: 19, minutes: 55, seconds: 45 })
  * @example
  * // returns { ..., month: 3, day: 31, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }
  * endOf('month', { month: 3, day: 20, hours: 5 })
  * @param  {DATE_PARTS}     part    Time interval, one of [second|minute|hour|day|month|year].
  * @param  {jesterday.Date} date    Base date.
  * @return {jesterday.Date}         Ending point of given time interval.
  */
export default function endOf (part, date) {
  let jsDate
  switch (part) {
    case DATE_PARTS.second:
      jsDate = toJS(date)
      jsDate.setUTCMilliseconds(999)
      break
    case DATE_PARTS.minute:
      jsDate = toJS(date)
      jsDate.setUTCSeconds(59, 999)
      break
    case DATE_PARTS.hour:
      jsDate = toJS(date)
      jsDate.setUTCMinutes(59, 59, 999)
      break
    case DATE_PARTS.day:
      jsDate = toJS(date)
      jsDate.setUTCHours(23, 59, 59, 999)
      break
    case DATE_PARTS.month:
      jsDate = toJS(date)
      jsDate.setUTCMonth(jsDate.getUTCMonth() + 1)
      jsDate.setUTCDate(0)
      jsDate.setUTCHours(23, 59, 59, 999)
      break
    case DATE_PARTS.year:
      jsDate = toJS(date)
      jsDate.setUTCFullYear(jsDate.getUTCFullYear() + 1)
      jsDate.setUTCMonth(0)
      jsDate.setUTCDate(0)
      jsDate.setUTCHours(23, 59, 59, 999)
      break
    default:
      return
  }

  return fromJS(jsDate, date.timezoneOffset)
}
