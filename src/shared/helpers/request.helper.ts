export function isServerError(number?: number): boolean {
  if (!number) {
    return false
  }

  const numberString = number.toString()

  return numberString.charAt(0) === '5'
}

export function isSendError(number?: number): boolean {
  if (!number) {
    return false
  }

  const numberString = number.toString()

  return numberString.charAt(0) === '4'
}
