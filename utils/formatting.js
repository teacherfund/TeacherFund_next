const currencyOpts = {
  maximumFractionDigits: 0
}

const formatCurrency = value => {
  return new Intl.NumberFormat('en-US', currencyOpts).format(value)
}

const formatFullName = ({ firstName, lastName }) =>
  [firstName, lastName].filter(Boolean).join(' ')

export { formatCurrency, formatFullName }
