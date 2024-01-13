import { pause } from './pause.helper'

export function debounce<K, T>(func: (inputs: K) => T, ms: number) {
  let args: K
  let result: T

  return async function debounceScoped(debounceArgs: K) {
    args = debounceArgs
    await pause(ms)
    if (args === debounceArgs) {
      result = func(args)
    }

    return result
  }
}
