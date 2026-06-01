import type { FieldHook } from 'payload/types'
import { UserRole } from '../../../access'

// ensure the first user created is an admin
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, append `admin` to the roles array
// access control is already handled by this fields `access` property
// it ensures that only admins can create and update the `roles` field
export const ensureFirstUserIsAdmin: FieldHook = async ({ operation, req, value }) => {
  const { payload, locale } = req
  if (operation === 'create') {
    const users = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 0,
      locale,
    })
    if (users.totalDocs === 0) {
      // if `admin` not in array of values, add it
      if (!(value || []).includes(UserRole.ADMIN)) {
        return [...(value || []), UserRole.ADMIN]
      }
    }
  }

  return value
}
