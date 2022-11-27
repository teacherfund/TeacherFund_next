const getCurrentYear = () => {
  return new Date().getFullYear()
}

const getUnix = (date) => {
  return Math.floor(date.getTime() / 1000)
}

const getDateFromUnix = (sec) => {
  return new Date((sec || 0) * 1000)
}

const formatDateAsYYYYMMDD = (date) => {
  if (!date) {
    return null
  }
  return date.toISOString().split('T')[0]
}

const formatTimestamp = (date) => {
  if (!date) {
    return ''
  }

  return date.toISOString()
    .split('.')[0]
    .replace(/[-:T]/g, '_')
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
  if (!date) {
    return false
  }
  const now = getDateNoHours(new Date())
  const dateToCompare = getDateNoHours(date)

  return dateToCompare > now
}

const formatUnixDateAsMMDDYYYY = (sec) => {
  const date = getDateFromUnix(sec)
  const dateString = formatDateAsYYYYMMDD(date)

  const [year, month, day] = dateString.split('-')

  return `${month}-${day}-${year}`
}

export {
  getCurrentYear,
  getDateNoHours,
  isFutureDate,
  formatDateAsYYYYMMDD,
  getUnix,
  getDateFromUnix,
  formatUnixDateAsMMDDYYYY,
  formatTimestamp
}
