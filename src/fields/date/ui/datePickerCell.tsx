import type { Props } from 'payload/components/views/Cell'
import type { ConditionalDateProps } from 'payload/dist/admin/components/elements/DatePicker/types'

import { format } from 'date-fns'
import { cs, enUS, sk } from 'date-fns/locale'
import React from 'react'
import { useLng } from '../../../hooks'
import { DATE_FORMATS } from '../../../translations'

const LOCALE_MAP = {
  cz: cs,
  en: enUS,
  sk,
} as const

export const datePickerCell =
  (pickerAppearance: ConditionalDateProps['pickerAppearance']): React.FC<Props> =>
  props => {
    const lng = useLng()
    const { cellData } = props

    if (!cellData) return null

    const dateFormat = DATE_FORMATS[pickerAppearance ?? 'dayAndTime']
    const formatPattern = dateFormat[lng] || dateFormat.en
    const dateLocale = LOCALE_MAP[lng] || enUS
    return <span>{format(cellData as any, formatPattern, { locale: dateLocale })}</span>
  }
