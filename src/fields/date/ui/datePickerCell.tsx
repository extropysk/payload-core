import type { Props } from 'payload/components/views/Cell'
import type { ConditionalDateProps } from 'payload/dist/admin/components/elements/DatePicker/types'

import { format } from 'date-fns'
import { cs, enUS, sk } from 'date-fns/locale'
import React, { useMemo } from 'react'
import { useLng } from '../../../hooks'
import { DATE_FORMATS } from '../../../translations'

const LOCALE_MAP = {
  cz: cs,
  en: enUS,
  sk,
} as const

type Args = {
  pickerAppearance: ConditionalDateProps['pickerAppearance']
  tz?: 'UTC'
}

export const datePickerCell =
  ({ pickerAppearance, tz }: Args): React.FC<Props> =>
  props => {
    const lng = useLng()
    const { cellData } = props

    const displayedValue = useMemo(() => {
      if (typeof cellData !== 'string') return null

      if (tz === 'UTC') {
        const utcDate = new Date(cellData)
        const offset = utcDate.getTimezoneOffset() * 60 * 1000
        return new Date(utcDate.getTime() + offset)
      } else {
        return new Date(cellData)
      }
    }, [tz, cellData])

    if (!displayedValue) return null

    const dateFormat = DATE_FORMATS[pickerAppearance ?? 'dayOnly']
    const formatPattern = dateFormat[lng] || dateFormat.en
    const dateLocale = LOCALE_MAP[lng] || enUS
    return <span>{format(displayedValue, formatPattern, { locale: dateLocale })}</span>
  }
