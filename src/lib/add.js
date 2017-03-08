import fromJS from './fromJS'
import toJS from './toJS'
import { DATE_PARTS, DATE_PARTS_PLURALIZED } from './enums'

/**
 * Returns base date increased by given number of units of time interval.
 * @param  {number}                           number Amount to increase by.
 * @param  {DATE_PARTS|DATE_PARTS_PLURALIZED} part   Date part.
 * @param  {jesterday.Date}                   date   Base date.
 * @return {jesterday.Date}                          Base date increased by given unit of time interval.
 */
export default function add (number, part, date) {
  let increase = number
  let op
  switch (part) {
    case DATE_PARTS.millisecond:
    case DATE_PARTS_PLURALIZED.milliseconds:
      op = { set: 'setUTCMilliseconds', get: 'getUTCMilliseconds' }
      break
    case DATE_PARTS.second:
    case DATE_PARTS_PLURALIZED.seconds:
      op = { set: 'setUTCSeconds', get: 'getUTCSeconds' }
      break
    case DATE_PARTS.minute:
    case DATE_PARTS_PLURALIZED.minutes:
      op = { set: 'setUTCMinutes', get: 'getUTCMinutes' }
      break
    case DATE_PARTS.hour:
    case DATE_PARTS_PLURALIZED.hours:
      op = { set: 'setUTCHours', get: 'getUTCHours' }
      break
    case DATE_PARTS.day:
    case DATE_PARTS_PLURALIZED.days:
      op = { set: 'setUTCDate', get: 'getUTCDate' }
      break
    case DATE_PARTS.week:
    case DATE_PARTS_PLURALIZED.weeks:
      op = { set: 'setUTCDate', get: 'getUTCDate' }
      increase *= 7
      break
    case DATE_PARTS.month:
    case DATE_PARTS_PLURALIZED.months:
      op = { set: 'setUTCMonth', get: 'getUTCMonth' }
      break
    case DATE_PARTS.year:
    case DATE_PARTS_PLURALIZED.years:
      op = { set: 'setUTCFullYear', get: 'getUTCFullYear' }
      break
    default:
      return
  }

  const jsDate = toJS(date)
  jsDate[op.set](jsDate[op.get]() + increase)
  return fromJS(jsDate, date.timezoneOffset)
}
