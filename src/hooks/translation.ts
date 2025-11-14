import { useState } from 'react'
import { DEFAULT_LNG, Lng } from '../translations'

export const getLng = (): Lng => (localStorage.getItem('lng') || DEFAULT_LNG) as Lng

export const useLng = (): Lng => {
  const [lng] = useState(getLng())
  return lng as Lng
}
