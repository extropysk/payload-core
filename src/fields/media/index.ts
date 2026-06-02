import type { Field, FieldBase } from 'payload/types'
import { translate } from '../../translations'

interface Options extends Pick<FieldBase, 'access'> {
  label?: Record<string, string> | string
  name?: string
  required?: boolean
}

export const mediaField = ({ name, label, required, access }: Options): Field => ({
  name: name ?? 'media',
  type: 'upload',
  label: label ?? translate('fields:media.label'),
  relationTo: 'media',
  required,
  access,
})
