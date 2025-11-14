import type { DateField, Field, FieldHook, Validate } from 'payload/types'

import { datePickerCell } from './ui/datePickerCell'
import { DatePickerField } from './ui/datePickerField'
import { Label } from '../../types'

interface Options {
  admin?: DateField['admin']
  defaultValue?: string
  hooks?: {
    afterChange?: FieldHook[]
    afterRead?: FieldHook[]
    beforeChange?: FieldHook[]
    beforeValidate?: FieldHook[]
  }
  label?: Label
  name: string
  required?: boolean
  tz?: 'UTC'
  validate?: Validate
}
export const dateField = ({
  name,
  admin = {},
  defaultValue,
  hooks,
  label,
  required,
  validate,
  tz,
}: Options): Field => ({
  name,
  type: 'date',
  custom: {
    tz,
  },
  admin: {
    ...admin,
    components: {
      Cell: datePickerCell(admin.date?.pickerAppearance),
      Field: DatePickerField,
    },
    date: {
      pickerAppearance: admin.date?.pickerAppearance,
    },
  },
  defaultValue,
  hooks,
  label,
  required,
  validate,
})
