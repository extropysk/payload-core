import type { CollectionConfig } from 'payload/types'

import path from 'path'

import { Action, Guard } from '@extropysk/express-core'
import { translate } from '../../../translations'

interface Args {
  guard: Guard
  group: string
}

export const media = ({ guard, group }: Args): CollectionConfig => ({
  slug: 'media',
  access: {
    create: guard.checkPermission(group, Action.CREATE),
    delete: guard.checkPermission(group, Action.DELETE),
    read: () => true,
    update: guard.checkPermission(group, Action.UPDATE),
  },
  admin: {
    group,
    hidden: guard.isHidden(group),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: translate('fields:alt.label'),
      localized: true,
    },
  ],
  labels: {
    plural: translate('collections:media.labels.plural'),
    singular: translate('collections:media.labels.singular'),
  },
  upload: {
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    mimeTypes: ['image/*'],
    staticDir: path.resolve(__dirname, '../../../../media'),
  },
})
