import type http from 'http'

import { API_KEY, API_URL } from '@shared/constants'
import {
  ApiError,
  PermissionError,
  ValidationError,
  isExtendedError,
  unknownToError,
} from '@shared/core'
import { pause } from '@shared/helpers'
import { IRequestOptions, IRequestResponse } from './../types'

export function isValid<T>(
  url: string,
  response: IRequestResponse<T>
): T | never {
  if (response.code === 401) {
    throw new PermissionError(
      `Access denied [${response.code}] to ${url}`,
      response
    )
  }

  if (!response.status) {
    throw new ValidationError(`${response.code} ${response.data}`, {
      code: response.code,
      data: response.data,
    })
  }

  return response.data
}

export default async function api<T>(
  url: string,
  options?: IRequestOptions,
  headers?: http.OutgoingHttpHeaders
): Promise<[T, Headers]> | never {
  try {
    const apiUrl = options?.customUrl ? '' : `${API_URL}v1/${API_KEY}/`

    const isNeedStringify = () => {
      if (options?.body && options?.method !== 'GET') {
        return { body: JSON.stringify(options.body) }
      } else if (options?.body && options.body instanceof FormData) {
        return { body: options.body }
      }

      return {}
    }

    const requestOptions = Object.assign(
      {},
      {
        headers: {
          'Content-Type':
            options?.body && options.body instanceof FormData
              ? 'multipart/form-data'
              : 'application/json',
          'Access-Control-Allow-Origin': '*',
          mode: 'no-cors',
          ...headers,
        },
      },
      options,
      isNeedStringify()
    )

    const request = fetch(`${apiUrl}${url}`, requestOptions as RequestInit)

    const result = await request

    const response: IRequestResponse<T> = {
      code: result.status,
      data: undefined as T,
      status: result.ok,
    }

    if (result.headers.get('content-type')?.includes('application/json')) {
      response.data = (await result.json()) as T
    } else {
      throw new ValidationError('Json parsing error', {
        code: result.status,
        data: {
          url,
          method: options?.method,
        },
      })
    }

    return [
      isValid(url, {
        code: response.code,
        status: response.status,
        data: response.data,
      }),
      result.headers,
    ]
  } catch (e) {
    if (isExtendedError(e)) {
      throw e
    }

    const error = unknownToError(e)
    throw new ApiError(error.message, {
      code: 500,
      stack: error.stack,
    })
  }
}

export async function retry<T>(
  retries: number,
  fn: () => Promise<T>,
  delay = 500,
  delayMultiply = 1
): Promise<T> {
  try {
    return await fn()
  } catch (e) {
    if (retries > 1) {
      await pause(delay)

      return await retry(retries - 1, fn, delay * delayMultiply)
    }

    throw e
  }
}
