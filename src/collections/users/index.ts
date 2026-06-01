import type { CollectionConfig } from 'payload/types'
import { admin, guard, self, UserRole } from '../../access'
import { translate } from '../../translations'

import { loginAfterCreate } from './hooks/loginAfterCreate'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

export const users = (): CollectionConfig => ({
  slug: 'users',
  access: {
    admin: () => true,
    create: admin,
    delete: admin,
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
        create: admin,
        update: admin,
      },
      defaultValue: [],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      label: translate('fields:roles.label'),
      options: Object.values(UserRole).map(value => ({ label: value, value })),
    },
  ],
  hooks: {
    afterChange: [loginAfterCreate],
  },
  timestamps: true,
})
