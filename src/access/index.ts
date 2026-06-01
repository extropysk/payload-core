import { Guard } from '@extropysk/express-core'
import type { Permission, User } from '@extropysk/express-core'
import type { Access, AccessArgs } from 'payload/config'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

const getRolePermissions = (role: any): Permission[] => {
  return []
}

export const guard = new Guard({
  adminRole: UserRole.ADMIN,
  getRolePermissions,
})

export const admin = ({ req: { user } }: AccessArgs<unknown, User>) => {
  return guard.checkAdmin(user)
}

export const self: Access = ({ req: { user } }) => {
  if (!user) return false

  if (guard.checkAdmin(user)) return true

  return {
    id: { equals: user?.id },
  }
}
