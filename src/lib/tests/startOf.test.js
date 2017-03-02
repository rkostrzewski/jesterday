import startOf from '../startOf'
import create from '../create'

const commonTest = ({ part, input, expected }) => {
  // Given
  const date = create(input)

  // When
  const actualDate = startOf(part, date)

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

describe('startOf', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = startOf('', date)
    expect(actual).toEqual(undefined)
  })

  describePart('second', {
    'should return date set to 0 milliseconds.': {
      input: { milliseconds: 200 },
      expected: { milliseconds: 0 },
    },
  })

  describePart('minute', {
    'should return date set to 0 seconds and 0 milliseconds.': {
      input: { seconds: 20 },
      expected: { seconds: 0, milliseconds: 0 },
    },
  })

  describePart('hour', {
    'should return date set to 0 minutes, 0 seconds and 0 milliseconds.': {
      input: { minutes: 20 },
      expected: { minutes: 0, seconds: 0, milliseconds: 0 },
    },
  })

  describePart('day', {
    'should return date set to 0 hours, 0 minutes, 0 seconds and 0 milliseconds.': {
      input: { hours: 2, minutes: 20 },
      expected: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
    },
  })

  describePart('month', {
    'should return date set to first day of month, 0 hours, 0 minutes, 0 seconds and 0 milliseconds': {
      input: { month: 1, day: 2 },
      expected: { month: 1, day: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
    },
  })

  describePart('year', {
    'should return date set to January 1st, 0 hours, 0 minutes, 0 seconds and 0 milliseconds for 30 day months.': {
      input: { year: 2017, month: 2 },
      expected: { year: 2017, month: 1, day: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
    },
  })
})
