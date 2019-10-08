const currencyOpts = {
  maximumFractionDigits: 0
}

const formatCurrency = value => {
  return new Intl.NumberFormat('en-US', currencyOpts).format(value)
}

export { formatCurrency }
