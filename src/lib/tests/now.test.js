import now from '../now'

describe('now', () => {
  it('should return current date.', () => {
    // Given
    // eslint-disable-next-line no-global-assign
    Date = function () {
      return {
        getUTCFullYear: () => 2013,
        getUTCMonth: () => 1,
        getUTCDate: () => 12,
        getUTCDay: () => 2,
        getUTCHours: () => 10,
        getUTCMinutes: () => 5,
        getUTCSeconds: () => 13,
        getUTCMilliseconds: () => 239,
        getTimezoneOffset: () => 30,
      }
    }
    const expected = {
      year: 2013,
      month: 2,
      day: 12,
      weekday: 2,
      hours: 10,
      minutes: 5,
      seconds: 13,
      milliseconds: 239,
      timezoneOffset: 30,
    }

    // When
    const actual = now()

    // Then
    expect(actual).toEqual(expected)
  })
})
