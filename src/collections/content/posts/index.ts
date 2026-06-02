import type { AccessResult } from 'payload/config'
import type { CollectionConfig } from 'payload/types'

import { Action, Guard } from '@extropysk/express-core'
import { translate } from '../../../translations'
import { filesField } from '../../../fields/files'
import { richText } from '../../../fields/richText'
import { dateField } from '../../../fields'
import { populatePublishedAt } from './hooks/populatePublishedAt'
import { populatedUserField, userField } from '../../../fields/user'
import { slugField } from '../../../fields/slug'

interface Args {
  guard: Guard
  group: string
}

const defaultAccess = (): AccessResult => ({
  publishedAt: {
    less_than: new Date(),
  },
})

export const posts = ({ guard, group }: Args): CollectionConfig => ({
  slug: 'posts',
  access: {
    create: guard.checkPermission(group, Action.CREATE),
    delete: guard.checkPermission(group, Action.DELETE),
    update: guard.checkPermission(group, Action.UPDATE),
    read: guard.checkPermission(group, Action.READ, { defaultAccess }),
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group,
    hidden: guard.isHidden(group),
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: translate('fields:detail.label'),
          fields: [
            {
              name: 'title',
              type: 'text',
              label: translate('fields:title.label'),
              localized: true,
              required: true,
            },
            {
              name: 'summary',
              type: 'textarea',
              label: translate('fields:summary.label'),
              localized: true,
            },
            filesField({ required: false }),
          ],
        },
        {
          label: translate('fields:content.label'),
          fields: [
            richText({
              name: 'content',
              localized: true,
              required: false,
              access: {
                read: ({ req, doc }): boolean => {
                  // is detail view
                  return !!req.params?.id || !doc?.id
                },
              },
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      label: translate('fields:categories.label'),
      relationTo: 'categories',
    },
    dateField({
      name: 'publishedAt',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [populatePublishedAt],
      },
      label: translate('fields:publishedAt.label'),
    }),
    userField(),
    populatedUserField(),
    slugField(),
  ],
  labels: {
    plural: translate('collections:posts.labels.plural'),
    singular: translate('collections:posts.labels.singular'),
  },
  versions: true,
})
