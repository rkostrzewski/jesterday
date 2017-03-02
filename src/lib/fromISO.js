import fromJS from './fromJS'

const isoDateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?([+-][0-2]\d:[0-5]\d|Z)/
const timezoneRegex = /([+-])(\d+):(\d+)/

const extractTimezoneOffset = isoDate => {
  const match = isoDateRegex.exec(isoDate)

  if (match[1] === 'Z') {
    return 0
  }

  const timezoneMatch = timezoneRegex.exec(match[1])
  const sign = timezoneMatch[1] === '+' ? 1 : -1
  return sign * ((+timezoneMatch[2] * 60) + +timezoneMatch[3])
}

/**
 * Parses ISO date into jesterday date object.
 * @param  {string}         isoDate  Date in ISO format.
 * @return {jesterday.Date}          Parsed date.
 */
export default function fromISO (isoDate) {
  const parsed = new Date(isoDate)

  return fromJS(parsed, extractTimezoneOffset(isoDate))
}
