export function generateRandomNumber(): number {
  return Math.floor(Math.random() * 999) + 1
}

export function generateRandomId(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%^&*'

  return Array.from({ length: 10 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('')
}
