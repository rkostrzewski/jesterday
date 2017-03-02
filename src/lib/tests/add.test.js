import add from '../add'
import create from '../create'

const commonTest = ({ increase, part, input, expected }) => {
  // Given
  const date = create(input)

  // When
  const actualDate = add(increase, part, date)

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

    it(`should be equivalent to ${part}s.`, () => {
      // Given
      const { increase, input } = testCases[testNames[0]]
      const date = create(input)

      // When
      const partResult = add(increase, part, date)
      const partsResult = add(increase, `${part}s`, date)

      // Then
      expect(partsResult).toEqual(create(partResult))
    })
  })
}

describe('add', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = add(1, '', date)
    expect(actual).toEqual(undefined)
  })

  describePart('millisecond', {
    'should return date with increased milliseconds by number.': {
      increase: 500,
      input: { milliseconds: 200 },
      expected: { milliseconds: 700 },
    },
    'should return date with different seconds when result date has different seconds.': {
      increase: 1300,
      input: { seconds: 1, milliseconds: 200 },
      expected: { seconds: 2, milliseconds: 500 },
    },
    'should return date with different minutes when result date has different minutes.': {
      increase: (60 * 1000) + 100,
      input: { minutes: 1, milliseconds: 200 },
      expected: { minutes: 2, milliseconds: 300 },
    },
    'should return date with different hour when result date has different hour.': {
      increase: (60 * 60 * 1000) + 100,
      input: { hours: 1, milliseconds: 200 },
      expected: { hours: 2, milliseconds: 300 },
    },
    'should return date with different day when result date has different day.': {
      increase: (24 * 60 * 60 * 1000) + 100,
      input: { day: 1, milliseconds: 200 },
      expected: { day: 2, milliseconds: 300 },
    },
    'should return date with different month when result date has different month.': {
      increase: (31 * 24 * 60 * 60 * 1000) + 100,
      input: { month: 1, milliseconds: 200 },
      expected: { month: 2, milliseconds: 300 },
    },
    'should return date with different year when result date is in different year.': {
      increase: 365 * 24 * 60 * 60 * 1000,
      input: { year: 2017 },
      expected: { year: 2018 },
    },
  })

  describePart('second', {
    'should return date with increased seconds by number.': {
      increase: 5,
      input: { seconds: 1 },
      expected: { seconds: 6 },
    },
    'should return date with different minutes when result date has different minutes.': {
      increase: 61,
      input: { minutes: 1, seconds: 2 },
      expected: { minutes: 2, seconds: 3 },
    },
    'should return date with different hour when result date has different hour.': {
      increase: (60 * 60) + 1,
      input: { hours: 1, seconds: 2 },
      expected: { hours: 2, seconds: 3 },
    },
    'should return date with different day when result date has different day.': {
      increase: (24 * 60 * 60) + 1,
      input: { day: 1, seconds: 2 },
      expected: { day: 2, seconds: 3 },
    },
    'should return date with different month when result date has different month.': {
      increase: (31 * 24 * 60 * 60) + 1,
      input: { month: 1, seconds: 2 },
      expected: { month: 2, seconds: 3 },
    },
    'should return date with different year when result date is in different year.': {
      increase: 365 * 24 * 60 * 60,
      input: { year: 2017 },
      expected: { year: 2018 },
    },
  })

  describePart('minute', {
    'should return date with increased minutes by number.': {
      increase: 5,
      input: { minutes: 1 },
      expected: { minutes: 6 },
    },
    'should return date with different hour when result date has different hour.': {
      increase: 60 + 1,
      input: { hours: 1, minutes: 2 },
      expected: { hours: 2, minutes: 3 },
    },
    'should return date with different day when result date has different day.': {
      increase: (24 * 60) + 1,
      input: { day: 1, minutes: 2 },
      expected: { day: 2, minutes: 3 },
    },
    'should return date with different month when result date has different month.': {
      increase: (31 * 24 * 60) + 1,
      input: { month: 1, minutes: 2 },
      expected: { month: 2, minutes: 3 },
    },
    'should return date with different year when result date is in different year.': {
      increase: 365 * 24 * 60,
      input: { year: 2017 },
      expected: { year: 2018 },
    },
  })

  describePart('hour', {
    'should return date with increased hours by number.': {
      increase: 5,
      input: { hours: 1 },
      expected: { hours: 6 },
    },
    'should return date with different day when result date has different day.': {
      increase: 24 + 1,
      input: { day: 1, hours: 2 },
      expected: { day: 2, hours: 3 },
    },
    'should return date with different month when result date has different month.': {
      increase: (31 * 24) + 1,
      input: { month: 1, hours: 2 },
      expected: { month: 2, hours: 3 },
    },
    'should return date with different year when result date is in different year.': {
      increase: 365 * 24,
      input: { year: 2017 },
      expected: { year: 2018 },
    },
  })

  describePart('day', {
    'should return date with increased day by number.': {
      increase: 5,
      input: { day: 1 },
      expected: { day: 6 },
    },
    'should return date with different month when result date has different month.': {
      increase: 29,
      input: { year: 2017, month: 2, day: 2 },
      expected: { year: 2017, month: 3, day: 3 },
    },
    'should return date with different year when result date is in different year.': {
      increase: 365,
      input: { year: 2017 },
      expected: { year: 2018 },
    },
  })

  describePart('month', {
    'should return date with increased day by number.': {
      increase: 5,
      input: { month: 1 },
      expected: { month: 6 },
    },
    'should return date with different year when result date is in different year.': {
      increase: 14,
      input: { year: 2017, month: 1 },
      expected: { year: 2018, month: 3 },
    },
  })

  describePart('year', {
    'should return date with increased year.': {
      increase: 5, input: { year: 2017 }, expected: { year: 2022 },
    },
  })
})
