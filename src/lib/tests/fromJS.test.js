import fromJS from '../fromJS'

describe('fromJS', () => {
  it('should convert JavaScript date to jesterday date.', () => {
    // Given
    const jsDate = new Date('2017-03-02T19:17:31.589')
    const expected = {
      year: 2017,
      month: 3,
      day: 2,
      weekday: 4,
      hours: 19,
      minutes: 17,
      seconds: 31,
      milliseconds: 589,
      timezoneOffset: jsDate.getTimezoneOffset(),
    }

    // When
    const actual = fromJS(jsDate)

    // Then
    expect(actual).toEqual(expected)
  })
})
