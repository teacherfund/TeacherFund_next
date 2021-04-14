const currencyOpts = {
  maximumFractionDigits: 0
}

const formatCurrency = value => {
  return new Intl.NumberFormat('en-US', currencyOpts).format(value)
}

const formatFullName = ({ firstName, lastName }) => {
  if (!firstName && !lastName) {
    return null
  }

  return `${firstName} ${lastName}`
}

export { formatCurrency, formatFullName }
