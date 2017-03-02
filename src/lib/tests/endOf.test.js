import endOf from '../endOf'
import create from '../create'

const commonTest = ({ part, input, expected }) => {
  // Given
  const date = create(input)

  // When
  const actualDate = endOf(part, date)

  // Then
  expect(actualDate).toEqual(create(expected))
}

const describePart = (part, testCases) => {
  describe(part, () => {
    const testNames = Object.keys(testCases)
    testNames.forEach(test => {
      it(test, () => {
        commonTest({ ...testCases[test], part })
      })
    })
  })
}

describe('endOf', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = endOf('', date)
    expect(actual).toEqual(undefined)
  })

  describePart('second', {
    'should return date set to 999 milliseconds.': {
      input: { milliseconds: 200 },
      expected: { milliseconds: 999 },
    },
  })

  describePart('minute', {
    'should return date set to 59 seconds and 999 milliseconds.': {
      input: { seconds: 20 },
      expected: { seconds: 59, milliseconds: 999 },
    },
  })

  describePart('hour', {
    'should return date set to 59 minutes, 59 seconds and 999 milliseconds.': {
      input: { minutes: 20 },
      expected: { minutes: 59, seconds: 59, milliseconds: 999 },
    },
  })

  describePart('day', {
    'should return date set to 23 hours, 59 minutes, 59 seconds and 999 milliseconds.': {
      input: { hours: 2, minutes: 20 },
      expected: { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
    },
  })

  describePart('month', {
    'should return date set to last day of month, 23 hours, 59 minutes, 59 seconds and 999 milliseconds for 30 day months.': {
      input: { month: 1, day: 2 },
      expected: { month: 1, day: 31, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
    },
    'should return date set to last day of month, 23 hours, 59 minutes, 59 seconds and 999 milliseconds for 31 day months.': {
      input: { month: 4, day: 2 },
      expected: { month: 4, day: 30, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
    },
    'should return end of February for leap years.': {
      input: { year: 2016, month: 2, day: 2 },
      expected: { year: 2016, month: 2, day: 29, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
    },
    'should return end of February for regular years.': {
      input: { year: 2017, month: 2 },
      expected: { year: 2017, month: 2, day: 28, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
    },
  })

  describePart('year', {
    'should return date set to December 31th, 23 hours, 59 minutes, 59 seconds and 999 milliseconds for 30 day months.': {
      input: { year: 2017, month: 2 },
      expected: { year: 2017, month: 12, day: 31, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 },
    },
  })
})
