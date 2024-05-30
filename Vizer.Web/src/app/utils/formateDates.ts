export function secondsToHoursMinutues(seconds: number): string {
  const minutesTotal = seconds / 60
  const hours = Math.floor(minutesTotal / 60)
  const minutes = minutesTotal - (60 * hours)

  return `${hours}h ${minutes}min`
}
