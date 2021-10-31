import { isEmptyString } from './string.utils'

const REQUIRED = 'Required'

export const validateText = (value) => {
  let error
  if (isEmptyString(value)) {
    error = REQUIRED
  }
  return error
}

export const validateEmail = (value) => {
  let error
  if (isEmptyString(value)) {
    error = REQUIRED
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

export const validateCurrency = (amount) => {
  let error
  if (!amount) {
    error = REQUIRED
  } else if (isNaN(amount)) {
    error = 'Must be a valid number'
  } else if (amount <= 0) {
    error = 'Must be greater than zero'
  }
  return error
}
