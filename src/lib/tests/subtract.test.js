import subtract from '../subtract'
import create from '../create'

const commonTest = ({ decrease, part, input, expected }) => {
  // Given
  const date = create(input)

  // When
  const actualDate = subtract(decrease, part, date)

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
      const { decrease, input } = testCases[testNames[0]]
      const date = create(input)

      // When
      const partResult = subtract(decrease, part, date)
      const partsResult = subtract(decrease, `${part}s`, date)

      // Then
      expect(partsResult).toEqual(create(partResult))
    })
  })
}

describe('add', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = subtract(1, '', date)
    expect(actual).toEqual(undefined)
  })

  describePart('millisecond', {
    'should return date with decreased milliseconds by number.': {
      decrease: 500,
      expected: { milliseconds: 200 },
      input: { milliseconds: 700 },
    },
    'should return date with different seconds when result date has different seconds.': {
      decrease: 1300,
      expected: { seconds: 1, milliseconds: 200 },
      input: { seconds: 2, milliseconds: 500 },
    },
    'should return date with different minutes when result date has different minutes.': {
      decrease: (60 * 1000) + 100,
      expected: { minutes: 1, milliseconds: 200 },
      input: { minutes: 2, milliseconds: 300 },
    },
    'should return date with different hour when result date has different hour.': {
      decrease: (60 * 60 * 1000) + 100,
      expected: { hours: 1, milliseconds: 200 },
      input: { hours: 2, milliseconds: 300 },
    },
    'should return date with different day when result date has different day.': {
      decrease: (24 * 60 * 60 * 1000) + 100,
      expected: { day: 1, milliseconds: 200 },
      input: { day: 2, milliseconds: 300 },
    },
    'should return date with different month when result date has different month.': {
      decrease: (31 * 24 * 60 * 60 * 1000) + 100,
      expected: { month: 1, milliseconds: 200 },
      input: { month: 2, milliseconds: 300 },
    },
    'should return date with different year when result date is in different year.': {
      decrease: 365 * 24 * 60 * 60 * 1000,
      expected: { year: 2017 },
      input: { year: 2018 },
    },
  })

  describePart('second', {
    'should return date with decreased seconds by number.': {
      decrease: 5,
      expected: { seconds: 1 },
      input: { seconds: 6 },
    },
    'should return date with different minutes when result date has different minutes.': {
      decrease: 61,
      expected: { minutes: 1, seconds: 2 },
      input: { minutes: 2, seconds: 3 },
    },
    'should return date with different hour when result date has different hour.': {
      decrease: (60 * 60) + 1,
      expected: { hours: 1, seconds: 2 },
      input: { hours: 2, seconds: 3 },
    },
    'should return date with different day when result date has different day.': {
      decrease: (24 * 60 * 60) + 1,
      expected: { day: 1, seconds: 2 },
      input: { day: 2, seconds: 3 },
    },
    'should return date with different month when result date has different month.': {
      decrease: (31 * 24 * 60 * 60) + 1,
      expected: { month: 1, seconds: 2 },
      input: { month: 2, seconds: 3 },
    },
    'should return date with different year when result date is in different year.': {
      decrease: 365 * 24 * 60 * 60,
      expected: { year: 2017 },
      input: { year: 2018 },
    },
  })

  describePart('minute', {
    'should return date with decreased minutes by number.': {
      decrease: 5,
      expected: { minutes: 1 },
      input: { minutes: 6 },
    },
    'should return date with different hour when result date has different hour.': {
      decrease: 60 + 1,
      expected: { hours: 1, minutes: 2 },
      input: { hours: 2, minutes: 3 },
    },
    'should return date with different day when result date has different day.': {
      decrease: (24 * 60) + 1,
      expected: { day: 1, minutes: 2 },
      input: { day: 2, minutes: 3 },
    },
    'should return date with different month when result date has different month.': {
      decrease: (31 * 24 * 60) + 1,
      expected: { month: 1, minutes: 2 },
      input: { month: 2, minutes: 3 },
    },
    'should return date with different year when result date is in different year.': {
      decrease: 365 * 24 * 60,
      expected: { year: 2017 },
      input: { year: 2018 },
    },
  })

  describePart('hour', {
    'should return date with decreased hours by number.': {
      decrease: 5,
      expected: { hours: 1 },
      input: { hours: 6 },
    },
    'should return date with different day when result date has different day.': {
      decrease: 24 + 1,
      expected: { day: 1, hours: 2 },
      input: { day: 2, hours: 3 },
    },
    'should return date with different month when result date has different month.': {
      decrease: (31 * 24) + 1,
      expected: { month: 1, hours: 2 },
      input: { month: 2, hours: 3 },
    },
    'should return date with different year when result date is in different year.': {
      decrease: 365 * 24,
      expected: { year: 2017 },
      input: { year: 2018 },
    },
  })

  describePart('day', {
    'should return date with decreased day by number.': {
      decrease: 5,
      expected: { day: 1 },
      input: { day: 6 },
    },
    'should return date with different month when result date has different month.': {
      decrease: 29,
      expected: { year: 2017, month: 2, day: 2 },
      input: { year: 2017, month: 3, day: 3 },
    },
    'should return date with different year when result date is in different year.': {
      decrease: 365,
      expected: { year: 2017 },
      input: { year: 2018 },
    },
  })

  describePart('month', {
    'should return date with decreased day by number.': {
      decrease: 5,
      expected: { month: 1 },
      input: { month: 6 },
    },
    'should return date with different year when result date is in different year.': {
      decrease: 14,
      expected: { year: 2017, month: 1 },
      input: { year: 2018, month: 3 },
    },
  })

  describePart('year', {
    'should return date with decreased year.': {
      decrease: 5, expected: { year: 2017 }, input: { year: 2022 },
    },
  })
})
