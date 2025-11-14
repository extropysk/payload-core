export const toUtc = (date: Date | string): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const offset = dateObj.getTimezoneOffset() * 60 * 1000
  return new Date(dateObj.getTime() - offset)
}
