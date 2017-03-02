import fromISO from '../fromISO'

describe('fromISO', () => {
  it('should convert ISO date with positive timezone positive offset to jesterday date.', () => {
    // Given
    const isoDate = '2017-03-02T19:17:31.589+07:30'
    const expected = {
      year: 2017,
      month: 3,
      day: 2,
      weekday: 4,
      hours: 11,
      minutes: 47,
      seconds: 31,
      milliseconds: 589,
      timezoneOffset: 450,
    }

    // When
    const actual = fromISO(isoDate)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should convert ISO date with negative timezone offset to jesterday date.', () => {
    // Given
    const isoDate = '2017-03-02T19:17:31.589-07:30'
    const expected = {
      year: 2017,
      month: 3,
      day: 3,
      weekday: 5,
      hours: 2,
      minutes: 47,
      seconds: 31,
      milliseconds: 589,
      timezoneOffset: -450,
    }

    // When
    const actual = fromISO(isoDate)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should convert ISO date without timezone offset to jesterday date.', () => {
    // Given
    const isoDate = '2017-03-02T19:17:31.589Z'
    const expected = {
      year: 2017,
      month: 3,
      day: 2,
      weekday: 4,
      hours: 19,
      minutes: 17,
      seconds: 31,
      milliseconds: 589,
      timezoneOffset: 0,
    }

    // When
    const actual = fromISO(isoDate)

    // Then
    expect(actual).toEqual(expected)
  })
})
