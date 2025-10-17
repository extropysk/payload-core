import type { FieldHook } from 'payload/types'
import { decrypt, encrypt } from '../../../utils'

export const decryptField =
  (aesKey: string): FieldHook =>
  ({ value }) => {
    try {
      if (typeof value === 'string') {
        return decrypt(value, aesKey)
      }
    } catch (e) {}
  }

export const encryptField =
  (aesKey: string): FieldHook =>
  ({ value }) => {
    if (typeof value === 'string') {
      return encrypt(value, aesKey)
    }
  }
