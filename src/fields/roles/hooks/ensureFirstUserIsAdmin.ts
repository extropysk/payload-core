import { Guard } from '@extropysk/express-core'
import type { FieldHook } from 'payload/types'

interface Args {
  guard: Guard
}

// ensure the first user created is an admin
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, append `admin` to the roles array
// access control is already handled by this fields `access` property
// it ensures that only admins can create and update the `roles` field
export const ensureFirstUserIsAdmin =
  ({ guard }: Args): FieldHook =>
  async ({ operation, req, value }) => {
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
        if (!(value || []).includes(guard.getAdminRole())) {
          return [...(value || []), guard.getAdminRole()]
        }
      }
    }

    return value
  }
