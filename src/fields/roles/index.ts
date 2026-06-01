import type { Field } from 'payload/types'
import { translate } from '../../translations'
import { Label } from '../../types'
import { Guard } from '@extropysk/express-core'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

interface Options {
  guard: Guard
  roles: string[]
  label?: Label
  required?: boolean
}

export const rolesField = ({ guard, roles, required, label }: Options): Field => ({
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
  required,
  label: label ?? translate('fields:roles.label'),
  options: Object.values(roles).map(value => ({ label: value, value })),
})
