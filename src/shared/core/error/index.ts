export {
  ApiError,
  FatalError,
  PermissionError,
  ValidationError,
  isExtendedError,
  unknownToError,
} from './error'
export type { IExtendedError } from './error'
export { ErrorProvider, useError } from './error.provider'
