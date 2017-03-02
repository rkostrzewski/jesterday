import fromJS from './fromJS'
import toJS from './toJS'

export const fillDefaults = ({
  year = 1901, month = 1, day = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, timezoneOffset = 0,
}) => ({
  year, month, day, hours, minutes, seconds, milliseconds, timezoneOffset,
})

/**
 * Creates Date object with all properties set to default values except those found in passed object.
 * @param  {jesterday.Date}  date Partially set jesterday date object
 * @return {jesterday.Date}       jesterday date object with all properties set
 */
export default function create (date) {
  const filledDate = fillDefaults(date)

  return fromJS(toJS(filledDate), filledDate.timezoneOffset)
}
