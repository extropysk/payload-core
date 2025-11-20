import type { DateTimeInputProps } from 'payload/dist/admin/components/forms/field-types/DateTime/Input'
import type { DateField } from 'payload/types'

import classNames from 'classnames'
import { DateTimeInput, Label, useFieldType } from 'payload/components/forms'
import React, { useCallback, useMemo } from 'react'
import { useLng } from '../../../hooks'
import { DATE_FORMATS } from '../../../translations'

import './styles.scss'
import { toUtc } from '../../../utils'

interface Props extends DateTimeInputProps {
  admin: DateField['admin']
  custom?: {
    tz?: 'UTC'
  }
}

export const DatePickerField: React.FC<Props> = ({
  admin,
  defaultValue,
  label,
  path,
  readOnly,
  required,
  custom,
  ...rest
}) => {
  const lng = useLng()
  const { value = defaultValue, setValue, errorMessage, showError } = useFieldType({ path })

  const appearance = admin?.date?.pickerAppearance ?? 'dayOnly'
  const displayFormat = DATE_FORMATS[appearance][lng]

  const tz = custom?.tz

  const displayedValue = useMemo(() => {
    if (!value) return value

    if (tz === 'UTC') {
      const utcDate = new Date(value)
      const offset = utcDate.getTimezoneOffset() * 60 * 1000
      return new Date(utcDate.getTime() + offset).toISOString()
    } else {
      return value
    }
  }, [tz, value])

  const onChange = useCallback(
    (incomingDate: Date) => {
      if (readOnly) return

      let value: null | string = null
      if (incomingDate) {
        if (tz === 'UTC') {
          value = toUtc(incomingDate).toISOString()
        } else {
          value = incomingDate.toISOString()
        }
      }

      setValue(value)
    },
    [readOnly, setValue, tz],
  )

  return (
    <div
      className={classNames('field-type', 'date', 'custom-date-picker', {
        error: showError && errorMessage,
        'read-only': readOnly,
      })}
    >
      <Label htmlFor={path} label={label} required={required} />
      <DateTimeInput
        datePickerProps={{
          ...admin?.date,
          displayFormat,
        }}
        errorMessage={showError ? errorMessage : undefined}
        onChange={onChange}
        path={path}
        readOnly={readOnly}
        required={required}
        showError={showError}
        value={displayedValue}
        {...rest}
      />
    </div>
  )
}
