/**
 * @typedef {Object} jesterday.Date
 * @property {number}  year         UTC year
 * @property {number}  month        UTC month (starting from 1)
 * @property {number}  day          UTC day
 * @property {number}  hours        UTC hours
 * @property {number}  minutes      UTC minutes
 * @property {number}  seconds      UTC seconds
 * @property {number}  milliseconds UTC milliseconds
 */

export { default as now } from './lib/now'
export { default as create } from './lib/create'

export { default as fromJS } from './lib/fromJS'
export { default as fromISO } from './lib/fromISO'
export { default as toJS } from './lib/toJS'

export { default as add } from './lib/add'
export { default as subtract } from './lib/subtract'

export { default as startOf } from './lib/startOf'
export { default as endOf } from './lib/endOf'
