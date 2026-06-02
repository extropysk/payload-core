import type { Field } from 'payload/types'

import { mediaField } from '../media'
import { translate } from '../../translations'

interface Options {
  label?: Record<string, string> | string
  labels?: {
    plural: Record<string, string> | string
    singular: Record<string, string> | string
  }
  name?: string
  required?: boolean
}

export const filesField = ({ name, label, labels, required }: Options): Field => ({
  name: name ?? 'files',
  type: 'array',
  fields: [mediaField({ required: true })],
  label: label ?? translate('fields:files.labels.plural'),
  labels: {
    plural: labels?.plural ?? translate('fields:files.labels.plural'),
    singular: labels?.singular ?? translate('fields:files.labels.singular'),
  },
  required,
})
