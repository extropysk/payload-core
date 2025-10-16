import _ from 'lodash'

import en from './en.json'
import sk from './sk.json'

export const translations = {
  en,
  sk,
}

type Lng = keyof typeof translations

export const translate = (key: string) => {
  const languages = Object.keys(translations) as Lng[]

  const path = key.replace(':', '.').split('.')
  return languages.reduce((acc, lng) => {
    acc[lng] = _.get(translations[lng], path, key)
    return acc
  }, {} as Record<string, string>)
}
