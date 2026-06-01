import type { Plugin } from 'payload/config'
import type { Payload } from 'payload/dist/payload'

import { users } from '../collections/users'

interface Args {}

const onInitExtension = (pluginOptions: Args, payload: Payload): void => {
  const { express: app } = payload

  if (!app) return

  try {
    // You can use the existing express app here to add middleware, routes, etc.
    // app.use(...)
  } catch (err: unknown) {
    payload.logger.error({ msg: 'Error in onInitExtension', err })
  }
}

export const corePlugin =
  (pluginOptions: Args): Plugin =>
  incomingConfig => {
    let config = { ...incomingConfig }

    config.admin = {
      ...(config.admin || {}),

      // Add additional admin config here

      user: 'users',
      components: {
        ...(config.admin?.components || {}),
      },
    }

    config.collections = [
      ...(config.collections || []),
      // Add additional collections here
      users(),
    ]

    config.endpoints = [
      ...(config.endpoints || []),
      // Add additional endpoints here
    ]

    config.globals = [
      ...(config.globals || []),
      // Add additional globals here
    ]

    config.hooks = {
      ...(config.hooks || {}),
      // Add additional hooks here
    }

    config.onInit = async payload => {
      if (incomingConfig.onInit) await incomingConfig.onInit(payload)
      // Add additional onInit code by using the onInitExtension function
      onInitExtension(pluginOptions, payload)
    }

    return config
  }
