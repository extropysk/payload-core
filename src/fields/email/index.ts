import type { Field, FieldBase } from 'payload/types'
import { translate } from '../../translations'
import { Label } from '../../types'

interface Options {
  label?: Label
  access?: FieldBase['access']
  required?: boolean
}

export const emailField = ({ required, access, label }: Options = {}): Field => ({
  name: 'email',
  type: 'text',
  label: label ?? translate('fields:email.label'),
  required,
  access,
})
