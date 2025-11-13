import type { FieldHook } from 'payload/types'
import { createId } from '../../../utils'

export const populateId: FieldHook = async ({ operation, value, data }) => {
  if (operation === 'create') {
    if (value && data?.createdAt) return value
    return createId()
  }

  return value
}
