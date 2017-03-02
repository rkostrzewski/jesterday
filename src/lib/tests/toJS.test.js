import toJS from '../toJS'

describe('toJS', () => {
  it('should convert jesterday date to JavaScript date.', () => {
    // Given
    const expected = new Date('2017-03-02T19:17:31.589Z')
    const date = {
      year: 2017,
      month: 3,
      day: 2,
      weekday: 4,
      hours: 19,
      minutes: 17,
      seconds: 31,
      milliseconds: 589,
      timezoneOffset: expected.getTimezoneOffset(),
    }

    // When
    const actual = toJS(date)

    // Then
    expect(actual).toEqual(expected)
  })
})
