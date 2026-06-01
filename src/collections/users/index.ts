import type { Access, CollectionConfig } from 'payload/types'

import { translate } from '../../translations'

import { loginAfterCreate } from './hooks/loginAfterCreate'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { Guard } from '@extropysk/express-core'

interface Args {
  guard: Guard
  roles: string[]
}

export const users = ({ guard, roles }: Args): CollectionConfig => {
  const self: Access = ({ req: { user } }) => {
    if (!user) return false

    if (guard.checkAdmin(user)) return true

    return {
      id: { equals: user?.id },
    }
  }

  return {
    slug: 'users',
    access: {
      admin: () => true,
      create: guard.admin,
      delete: guard.admin,
      read: self,
      update: self,
    },
    admin: {
      defaultColumns: ['name', 'email'],
      group: 'core',
      hidden: ({ user }) => !guard.checkAdmin(user),
      useAsTitle: 'email',
    },
    auth: {
      cookies: {
        secure: true,
        sameSite: 'lax',
      },
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        label: translate('fields:nameSurname.label'),
      },
      {
        name: 'roles',
        type: 'select',
        access: {
          create: guard.admin,
          update: guard.admin,
        },
        defaultValue: [],
        hasMany: true,
        hooks: {
          beforeChange: [ensureFirstUserIsAdmin({ guard })],
        },
        label: translate('fields:roles.label'),
        options: Object.values(roles).map(value => ({ label: value, value })),
      },
    ],
    hooks: {
      afterChange: [loginAfterCreate],
    },
    timestamps: true,
  }
}
