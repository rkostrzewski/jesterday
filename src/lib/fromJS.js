/**
 * Converts JavaScript Date into jesterday date.
 * @param  {Date}           jsDate         JavaScript date.
 * @param  {[type]}         timezoneOffset Optional: Timezone offset to set in created date.
 * @return {jesterday.Date}                Converted date.
 */
export default function fromJS (jsDate, timezoneOffset) {
  return {
    year: jsDate.getUTCFullYear(),
    month: jsDate.getUTCMonth() + 1,
    day: jsDate.getUTCDate(),
    weekday: jsDate.getUTCDay(),
    hours: jsDate.getUTCHours(),
    minutes: jsDate.getUTCMinutes(),
    seconds: jsDate.getUTCSeconds(),
    milliseconds: jsDate.getUTCMilliseconds(),
    timezoneOffset: timezoneOffset === undefined ? jsDate.getTimezoneOffset() : timezoneOffset,
  }
}
