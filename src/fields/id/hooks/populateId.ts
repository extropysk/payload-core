import { createId } from '@paralleldrive/cuid2'
import type { FieldHook } from 'payload/types'

export const populateId: FieldHook = async ({ operation, value, data }) => {
  if (operation === 'create') {
    if (value && data?.createdAt) return value
    return createId()
  }

  return value
}
