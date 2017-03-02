import { fillDefaults } from './create'

/**
 * Converts jesterday date into JS date.
 * @param  {jesterday.Date}  date  Date to convert.
 * @return {Date}                  Converted date.
 */
export default function toJS (date) {
  const { year, month, day, hours, minutes, seconds, milliseconds } = fillDefaults(date)
  const jsDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds))
  return jsDate
}
