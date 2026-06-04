import type { Plugin } from 'payload/config'
import type { Payload } from 'payload/dist/payload'

import { users } from '../collections/core/users'
import { Guard } from '@extropysk/express-core'

interface Args {
  guard: Guard
  roles?: string[]
}

const GROUP = 'core'

const onInitExtension = (args: Args, payload: Payload): void => {
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
  (args: Args): Plugin =>
  incomingConfig => {
    const { guard, roles = ['admin'] } = args

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
      users({ guard, roles, group: GROUP }),
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
      onInitExtension(args, payload)
    }

    return config
  }
