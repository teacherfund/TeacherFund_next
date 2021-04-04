const getCurrentYear = () => {
  return new Date().getFullYear()
}

const getDateNoHours = (date) => {
  if (!date) {
    return null
  }
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0
  )
}

const isFutureDate = (date) => {
  const now = getDateNoHours(new Date())
  const dateToCompare = getDateNoHours(date)

  return dateToCompare > now
}

export {
  getCurrentYear,
  getDateNoHours,
  isFutureDate
}
