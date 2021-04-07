const currencyOpts = {
  maximumFractionDigits: 0
}

const formatCurrency = value => {
  return new Intl.NumberFormat('en-US', currencyOpts).format(value)
}

const formatQueryParams = params => {
  return Object.keys(params).map(k => `${k}=${encodeURIComponent(params[k])}`).join('&')
}

const formatFullName = ({ firstName, lastName }) => {
  if (!firstName && !lastName) {
    return null
  }

  return `${firstName} ${lastName}`
}

export { formatCurrency, formatQueryParams, formatFullName }
