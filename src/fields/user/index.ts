import type { Field, FieldHook } from 'payload/types'

import { getIdFromObject } from '@extropysk/express-core'
import { populateUser } from './hooks/populateUser'

const onBeforeChange: FieldHook = ({ req: { user }, value }) => {
  if (value) return value
  return getIdFromObject(user)
}

export const userField = (): Field => ({
  name: 'user',
  type: 'relationship',
  admin: {
    hidden: true,
    position: 'sidebar',
    readOnly: true,
  },
  hooks: {
    beforeChange: [onBeforeChange],
  },
  relationTo: 'users',
})

export const populatedUserField = (): Field => ({
  name: 'populatedUser',
  type: 'group',
  access: {
    update: () => false,
  },
  admin: {
    disabled: true,
    readOnly: true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
  hooks: {
    afterRead: [populateUser],
  },
})
