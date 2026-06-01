import type { Access, CollectionConfig } from 'payload/types'

import { translate } from '../../translations'

import { loginAfterCreate } from './hooks/loginAfterCreate'
import { Guard } from '@extropysk/express-core'
import { rolesField } from '../../fields/roles'

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
      rolesField({ guard, roles }),
    ],
    hooks: {
      afterChange: [loginAfterCreate],
    },
    timestamps: true,
  }
}
