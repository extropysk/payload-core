import type { CollectionConfig } from 'payload/types'

import { Action, Guard } from '@extropysk/express-core'
import { translate } from '../../translations'

interface Args {
  guard: Guard
  group: string
}

export const categories = ({ guard, group }: Args): CollectionConfig => ({
  slug: 'categories',
  access: {
    create: guard.checkPermission(group, Action.CREATE),
    delete: guard.checkPermission(group, Action.DELETE),
    read: () => true,
    update: guard.checkPermission(group, Action.UPDATE),
  },
  admin: {
    group,
    hidden: guard.isHidden(group),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: translate('fields:title.label'),
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: translate('fields:description.label'),
      localized: true,
    },
  ],
  labels: {
    plural: translate('collections:categories.labels.plural'),
    singular: translate('collections:categories.labels.singular'),
  },
})
