export function formatDateToDayMonth(date: Date | undefined) {
  if (date) {
    const newDate = new Date(date)

    const day = String(newDate.getUTCDate()).padStart(2, '0')

    const month = String(newDate.getUTCMonth() + 1).padStart(2, '0')

    return `${day}/${month}`
  }
}
