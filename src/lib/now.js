import fromJS from './fromJS'

/**
 * Returns current date.
 * @return {jesterday.Date} Current date.
 */
export default function now () {
  return fromJS(new Date())
}
