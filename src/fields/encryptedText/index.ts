import type { Condition, Field } from 'payload/types'
import { decryptField, encryptField } from './hooks/crypto'
import { Label } from '../../types'

interface Options {
  aesKey: string
  name: string
  label?: Label
  required?: boolean
  condition?: Condition
}
export const encryptedTextField = ({
  aesKey,
  condition,
  name,
  label,
  required,
}: Options): Field => ({
  name,
  type: 'text',
  label,
  required,
  admin: {
    condition,
  },
  hooks: {
    beforeChange: [encryptField(aesKey)],
    afterRead: [decryptField(aesKey)],
  },
})
