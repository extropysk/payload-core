import { getIdFromObject } from '@extropysk/express-core'
import { FieldHook } from 'payload/types'

export const populateUser: FieldHook = async ({ data, req }) => {
  const { payload, locale } = req
  if (!data) return null
  const user = await payload.findByID({
    id: getIdFromObject(data.user),
    collection: 'users',
    depth: 0,
    locale,
  })

  return {
    id: user.id,
    name: user.name,
  }
}
