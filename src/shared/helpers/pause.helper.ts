export const pause = (duration: number): Promise<void> =>
  new Promise((res) => setTimeout(res, duration))
