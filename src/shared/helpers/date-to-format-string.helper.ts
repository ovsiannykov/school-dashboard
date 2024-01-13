export const padStart = (number: number) => number.toString().padStart(2, '0')

export const dateToFormatString = (date: Date, time = true) =>
  `${padStart(date.getDate())}/${padStart(date.getMonth() + 1)}/${padStart(date.getFullYear())} ${
    time ? `${padStart(date.getHours())}:${padStart(date.getMinutes())}` : ''
  }`
