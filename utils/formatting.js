const currencyOpts = {
  maximumFractionDigits: 0
}

const formatCurrency = value => {
  return new Intl.NumberFormat('en-US', currencyOpts).format(value)
}

const formatQueryParams = params => {
  return Object.keys(params).map(k => `${k}=${encodeURIComponent(params[k])}`).join('&')
}

export { formatCurrency, formatQueryParams }
