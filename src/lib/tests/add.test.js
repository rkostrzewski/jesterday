import jsc from 'jsverify'
import add from '../add'
import create from '../create'
import toJS from '../toJS'
import { wrapJscTest, getIncreasedDatePartMilliseconds } from './utils'
import { dateArbitary } from './generators'
import { DATE_PARTS, DATE_PARTS_PLURALIZED } from '../enums'

const generateTests = test => () => {
  jsc.assert(
    jsc.forall(
      jsc.nat,
      dateArbitary,
      (increase, date) => wrapJscTest(() => test(increase, date))
    )
  )
}

const addTest = (part, increase, date) => {
  // Given
  const inputDate = create(date)
  const expectedMsDiff = getIncreasedDatePartMilliseconds(increase, part, inputDate)

  // When
  const increasedDate = add(increase, part, inputDate)

  // Then
  const msDiff = toJS(increasedDate).getTime() - toJS(inputDate).getTime()
  expect(msDiff).toEqual(expectedMsDiff)
}

const sameResultsForPluralizedTest = (singularPart, pluralizedPart, increase, date) => {
  // Given
  const inputDate = create(date)
  const expected = add(increase, singularPart, inputDate)

  // When
  const actual = add(increase, pluralizedPart, inputDate)

  // Then
  expect(actual).toEqual(expected)
}

describe('add', () => {
  it('should return undefined for unknown date part.', () => {
    const date = create({})
    const actual = add(1, '', date)
    expect(actual).toEqual(undefined)
  })

  Object.keys(DATE_PARTS).forEach(part => {
    describe(part, () => {
      it(
        `should increase date by specified amount of ${part}s.`,
        generateTests(addTest.bind(null, part))
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
