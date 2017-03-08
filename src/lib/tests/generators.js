import { bless, integer, generator, sampler } from 'jsverify'
import { daysInMonth } from './utils'

const yearsArbitary = integer(150, 9999)
const monthArbitary = integer(1, 12)
const daysArbitary = bless({
  generator: generator.combine(yearsArbitary.generator, monthArbitary.generator, (year, month) => {
    const generator = integer(1, daysInMonth(year, month))
    return sampler(generator)()
  }),
})
const hoursArbitary = integer(1, 23)
const minutesArbitary = integer(0, 60)
const secondsArbitary = integer(0, 60)
const millisecondsArbitary = integer(0, 1000)

export const dateArbitary = bless({
  generator: generator.combine(
    yearsArbitary.generator,
    monthArbitary.generator,
    daysArbitary.generator,
    hoursArbitary.generator,
    minutesArbitary.generator,
    secondsArbitary.generator,
    millisecondsArbitary.generator,
    (year, month, day, hours, minutes, seconds, milliseconds) => ({
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds,
    })
  ),
})
