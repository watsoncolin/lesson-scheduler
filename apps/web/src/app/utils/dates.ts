export function formatDateTime(dateTime: string) {
  const date = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = {
    month: 'long', // 'January'
    day: 'numeric', // '27'
    hour: 'numeric', // '12 PM'
    minute: 'numeric', // '30'
  }
  return date.toLocaleString('en-US', options)
}
