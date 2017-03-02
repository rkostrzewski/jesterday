import create from '../create'

describe('create', () => {
  it('should fill all properties if none are passed.', () => {
    // Given
    const expected = { year: 1901, day: 1, month: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, timezoneOffset: 0, weekday: 2 }
    const input = { }

    // When
    const actual = create(input)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should missing properties if some are passed.', () => {
    // Given
    const expected = { year: 1901, day: 23, month: 4, hours: 0, minutes: 0, seconds: 54, milliseconds: 0, timezoneOffset: 300, weekday: 2 }
    const input = { day: 23, month: 4, timezoneOffset: 300, seconds: 54 }

    // When
    const actual = create(input)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should fill no properties if all are passed.', () => {
    // Given
    const input = { year: 1984, day: 12, month: 11, hours: 18, minutes: 36, seconds: 9, milliseconds: 6, timezoneOffset: -180, weekday: 1 }
    const expected = input

    // When
    const actual = create(input)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should not set weekday.', () => {
    // Given
    const expected = { year: 1901, day: 1, month: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, timezoneOffset: 0, weekday: 2 }
    const input = { weekday: 6 }

    // When
    const actual = create(input)

    // Then
    expect(actual).toEqual(expected)
  })
})
