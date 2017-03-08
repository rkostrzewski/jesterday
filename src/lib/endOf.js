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
  let jsDate = toJS(date)
  switch (part) {
    case DATE_PARTS.second:
      jsDate.setUTCMilliseconds(999)
      break
    case DATE_PARTS.minute:
      jsDate.setUTCSeconds(59, 999)
      break
    case DATE_PARTS.hour:
      jsDate.setUTCMinutes(59, 59, 999)
      break
    case DATE_PARTS.day:
      jsDate.setUTCHours(23, 59, 59, 999)
      break
    case DATE_PARTS.week:
      const daysUntilEndOfWeek = 6 - jsDate.getUTCDay()
      jsDate.setUTCHours(23, 59, 59, 999)
      jsDate.setUTCDate(jsDate.getUTCDate() + daysUntilEndOfWeek)
      break
    case DATE_PARTS.month:
      jsDate.setUTCMonth(jsDate.getUTCMonth() + 1)
      jsDate.setUTCDate(0)
      jsDate.setUTCHours(23, 59, 59, 999)
      break
    case DATE_PARTS.year:
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
