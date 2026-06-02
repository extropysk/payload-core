import type { FieldHook } from 'payload/types'

export const populatePublishedAt: FieldHook = ({ operation, value }) => {
  if (operation === 'create' || operation === 'update') {
    if (!value) {
      return new Date()
    }
  }

  return value
}
