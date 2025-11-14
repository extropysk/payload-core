import _ from 'lodash'

import en from './en.json'
import sk from './sk.json'

export const translations = {
  en,
  sk,
}

export type Lng = keyof typeof translations

export const translate = (key: string) => {
  const languages = Object.keys(translations) as Lng[]

  const path = key.replace(':', '.').split('.')
  return languages.reduce((acc, lng) => {
    acc[lng] = _.get(translations[lng], path, key)
    return acc
  }, {} as Record<string, string>)
}

export const DEFAULT_LNG = 'en'

export const DATE_FORMATS = {
  dayAndTime: {
    cz: 'dd.MM.yyyy HH:mm',
    en: 'MM/dd/yyyy HH:mm',
    sk: 'dd.MM.yyyy HH:mm',
  },
  dayOnly: {
    cz: 'dd. MM. yyyy',
    en: 'MMM dd, yyyy',
    sk: 'dd. MM. yyyy',
  },
  timeOnly: {
    cz: 'HH:mm',
    en: 'HH:mm',
    sk: 'HH:mm',
  },
  default: {
    cz: 'dd.MM.yyyy HH:mm',
    en: 'MM/dd/yyyy HH:mm',
    sk: 'dd.MM.yyyy HH:mm',
  },
  monthOnly: {
    cz: 'MMM',
    en: 'MMM',
    sk: 'MMM',
  },
} as const
