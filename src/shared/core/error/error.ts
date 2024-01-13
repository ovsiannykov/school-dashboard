type Payload = {
  code?: number
  data?: unknown
  stack?: string
}

export interface IErrorTransfer {
  name: string
  message: string
  stack?: string
  payload?: {
    code?: number
    data?: unknown
  }
}

export class ValidationError extends Error {
  payload: Payload
  constructor(message: string, payload: Payload = {}) {
    super(message)

    this.name = 'ValidationError'

    this.message = message

    this.payload = payload

    if (payload.stack) {
      this.stack = payload.stack
    }
  }

  toJSON(): object {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    }
  }
}

export class PermissionError extends Error {
  payload: Payload
  constructor(message: string, payload: Payload = {}) {
    super(message)

    this.name = 'PermissionError'

    this.message = message

    this.payload = payload

    if (payload.stack) {
      this.stack = payload.stack
    }
  }
  toJSON(): object {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    }
  }
}

export class ApiError extends Error {
  payload: Payload
  constructor(message: string, payload: Payload = {}) {
    super(message)

    this.name = 'ApiError'

    this.message = message

    this.payload = payload

    if (payload.stack) {
      this.stack = payload.stack
    }
  }
  toJSON(): object {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    }
  }
}

export class FatalError extends Error {
  payload: Payload
  constructor(message: string, payload: Payload = {}) {
    super(`Fatal error: ${message}`)

    this.name = 'FatalError'

    this.message = message

    this.payload = payload

    if (payload.stack) {
      this.stack = payload.stack
    }
  }

  toJSON(): object {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    }
  }
}

export type IExtendedError =
  | FatalError
  | ApiError
  | PermissionError
  | ValidationError

/**
 * Function checks the error type based on payload similarity
 * @param e any error type
 * @returns true if this is extendedError
 */
export function isExtendedError(e: unknown): e is IExtendedError {
  return (
    e instanceof FatalError ||
    e instanceof ApiError ||
    e instanceof PermissionError ||
    e instanceof ValidationError
  )
}

/**
 * Convert unknown to Error object or keep if it was error
 * @param rawError unknown
 * @returns Error or Extended Error class
 */
export function unknownToError(rawError: unknown): Error | IExtendedError {
  if (rawError instanceof Error) {
    return rawError
  }

  if (isExtendedError(rawError)) {
    return rawError
  }

  if (typeof rawError === 'string') {
    return new Error(rawError)
  }

  return new Error('Oops... Something went wrong!')
}
