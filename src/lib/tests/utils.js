import { DATE_PARTS, DATE_PARTS_PLURALIZED } from '../enums'

export const isLeapYear = year => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true
  }

  return false
}

export const daysInMonth = (year, month) => {
  if (month === 2) {
    return 28 + isLeapYear(year)
  }

  return 31 - ((month - 1) % 7 % 2)
}

export const wrapJscTest = test => {
  try {
    test()
  } catch (e) {
    return false
  }
  return true
}

const getJulianDate = (year, month, day) => {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + (12 * a) - 3
  return day +
    Math.floor(((153 * m) + 2) / 5) +
    (365 * y) +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
}

export const dayDiff = (a, b) => {
  return getJulianDate(b.year, b.month, b.day) - getJulianDate(a.year, a.month, a.day)
}

export const getIncreasedDatePartMilliseconds = (increase, part, startDate) => {
  switch (part) {
    case DATE_PARTS.millisecond:
      return increase
    case DATE_PARTS.second:
      return increase * 1000
    case DATE_PARTS.minute:
      return increase * 60 * getIncreasedDatePartMilliseconds(1, DATE_PARTS.second)
    case DATE_PARTS.hour:
      return increase * 60 * getIncreasedDatePartMilliseconds(1, DATE_PARTS.minute)
    case DATE_PARTS.day:
      return increase * 24 * getIncreasedDatePartMilliseconds(1, DATE_PARTS.hour)
    case DATE_PARTS.week:
      return increase * 7 * getIncreasedDatePartMilliseconds(1, DATE_PARTS.day)
    case DATE_PARTS.month:
      return (
         getJulianDate(startDate.year, startDate.month + increase, 1) -
         getJulianDate(startDate.year, startDate.month, 1)
        ) *
        getIncreasedDatePartMilliseconds(1, DATE_PARTS.day)
    case DATE_PARTS.year:
    case DATE_PARTS_PLURALIZED.years:
      return (
         getJulianDate(startDate.year + increase, startDate.month, 1) -
         getJulianDate(startDate.year, startDate.month, 1)
        ) * getIncreasedDatePartMilliseconds(1, DATE_PARTS.day)
    default:
  }
}

export const getDecreasedDatePartMilliseconds = (decrease, part, startDate) => {
  switch (part) {
    case DATE_PARTS.month:
      return (
         getJulianDate(startDate.year, startDate.month, 1) -
         getJulianDate(startDate.year, startDate.month - decrease, 1)
        ) *
        getDecreasedDatePartMilliseconds(1, DATE_PARTS.day)
    case DATE_PARTS.year:
    case DATE_PARTS_PLURALIZED.years:
      return (
         getJulianDate(startDate.year, startDate.month, 1) -
         getJulianDate(startDate.year - decrease, startDate.month, 1)
        ) *
        getDecreasedDatePartMilliseconds(1, DATE_PARTS.day)
    default:
      return getIncreasedDatePartMilliseconds(decrease, part, startDate)
  }
}
