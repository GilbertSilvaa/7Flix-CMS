export function secondsToHoursMinutues(seconds: number): string {
  const minutesTotal = seconds / 60
  const hours = Math.floor(minutesTotal / 60)
  const minutes = minutesTotal - (60 * hours)

  return `${hours}h ${Math.round(minutes)}min`
}

export function secondsToHHMMSS(seconds: number) {
  const totalSeconds = Math.floor(seconds)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60

  const pad = (num: number) => String(num).padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
}