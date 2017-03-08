import jsc from 'jsverify'
import startOf from '../startOf'
import create from '../create'
import { dayDiff, wrapJscTest } from './utils'
import { dateArbitary } from './generators'
import { DATE_PARTS } from '../enums'

const generateTests = test => () => {
  jsc.assert(
    jsc.forall(
      dateArbitary,
      date => wrapJscTest(() => test(date))
    )
  )
}

const verifyLesserDateParts = (part, date) => {
  switch (part) {
    case DATE_PARTS.second:
      return date.milliseconds === 0
    case DATE_PARTS.minute:
      return date.seconds === 0 && verifyLesserDateParts(DATE_PARTS.second, date)
    case DATE_PARTS.hour:
      return date.minutes === 0 && verifyLesserDateParts(DATE_PARTS.minute, date)
    case DATE_PARTS.day:
      return date.hours === 0 && verifyLesserDateParts(DATE_PARTS.hour, date)
    case DATE_PARTS.week:
      return date.weekday === 0 && verifyLesserDateParts(DATE_PARTS.day, date)
    case DATE_PARTS.month:
      return date.day === 1 && verifyLesserDateParts(DATE_PARTS.day, date)
    case DATE_PARTS.year:
      return date.month === 1 && verifyLesserDateParts(DATE_PARTS.month, date)
    default:
  }
}

const verifyGreaterDateParts = (part, base, result) => {
  switch (part) {
    case DATE_PARTS.second:
      return base.year === result.year &&
        base.month === base.month &&
        base.date === base.date &&
        base.hours === base.hours &&
        base.minutes === base.minutes &&
        base.seconds === base.seconds
    case DATE_PARTS.minute:
      return base.year === result.year &&
        base.month === base.month &&
        base.date === base.date &&
        base.hours === base.hours &&
        base.minutes === base.minutes
    case DATE_PARTS.hour:
      return base.year === result.year &&
        base.month === base.month &&
        base.date === base.date &&
        base.hours === base.hours
    case DATE_PARTS.day:
      return base.year === result.year &&
        base.month === base.month &&
        base.date === base.date
    case DATE_PARTS.week:
      return dayDiff(result, base) < 7 &&
        dayDiff(result, base) >= 0
    case DATE_PARTS.month:
      return base.year === result.year &&
        base.month === base.month
    case DATE_PARTS.year:
      return base.year === result.year
    default:
  }
}

const startOfTest = (part, date) => {
  // Given
  const inputDate = create(date)

  // When
  const dateOfPartEnd = startOf(part, inputDate)

  // Then
  expect(verifyLesserDateParts(part, dateOfPartEnd)).toBe(true)
  expect(verifyGreaterDateParts(part, inputDate, dateOfPartEnd)).toBe(true)
}

describe('startOf', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = startOf('', date)
    expect(actual).toEqual(undefined)
  })

  Object.keys(DATE_PARTS).filter(dp => dp !== DATE_PARTS.millisecond).forEach(part => {
    describe(part, () => {
      it(
        `should return start of ${part}.`,
        generateTests(startOfTest.bind(null, part))
      )
    })
  })
})
