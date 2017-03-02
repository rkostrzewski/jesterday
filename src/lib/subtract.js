import add from './add'

/**
 * Returns base date decreased by given number of units of time interval.
 * @param  {number}                           number Amount to decrease by.
 * @param  {DATE_PARTS|DATE_PARTS_PLURALIZED} part   Time interval.
 * @param  {jesterday.Date}                   date   Base date.
 * @return {jesterday.Date}                          Base date decreased by given unit of time interval.
 */
export default function subtract (number, part, date) {
  return add(-number, part, date)
}
