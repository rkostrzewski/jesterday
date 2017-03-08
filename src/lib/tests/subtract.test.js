import jsc from 'jsverify'
import subtract from '../subtract'
import create from '../create'
import toJS from '../toJS'
import { wrapJscTest, getDecreasedDatePartMilliseconds } from './utils'
import { dateArbitary } from './generators'
import { DATE_PARTS, DATE_PARTS_PLURALIZED } from '../enums'

const generateTests = test => () => {
  jsc.assert(
    jsc.forall(
      jsc.nat,
      dateArbitary,
      (decrease, date) => wrapJscTest(() => test(decrease, date))
    )
  )
}

const subtractTest = (part, decrease, date) => {
  // Given
  const inputDate = create(date)
  const expectedMsDiff = getDecreasedDatePartMilliseconds(decrease, part, inputDate)

  // When
  const decreasedDate = subtract(decrease, part, inputDate)

  // Then
  const msDiff = toJS(inputDate).getTime() - toJS(decreasedDate).getTime()
  expect(msDiff).toEqual(expectedMsDiff)
}

const sameResultsForPluralizedTest = (singularPart, pluralizedPart, decrease, date) => {
  // Given
  const inputDate = create(date)
  const expected = subtract(decrease, singularPart, inputDate)

  // When
  const actual = subtract(decrease, pluralizedPart, inputDate)

  // Then
  expect(actual).toEqual(expected)
}

describe('subtract', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = subtract(1, '', date)
    expect(actual).toEqual(undefined)
  })

  Object.keys(DATE_PARTS).forEach(part => {
    describe(part, () => {
      it(
        `should decrease date by specified amount of ${part}s.`,
        generateTests(subtractTest.bind(null, part))
        )
    })
  })

  it('should produce same results for pluralized date parts as for singular date parts.', () => {
    Object.keys(DATE_PARTS).forEach(part => {
      var pluralizedPart = DATE_PARTS_PLURALIZED[part + 's']
      generateTests(sameResultsForPluralizedTest.bind(null, part, pluralizedPart))()
    })
  })
})
