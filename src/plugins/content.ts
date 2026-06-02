import type { Plugin } from 'payload/config'
import type { Payload } from 'payload/dist/payload'
import { Guard } from '@extropysk/express-core'
import { categories } from '../collections/content/categories'
import { media } from '../collections/content/media'

interface Args {
  guard: Guard
}

const GROUP = 'content'

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

export const contentPlugin =
  (args: Args): Plugin =>
  incomingConfig => {
    const { guard } = args

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
      categories({ guard, group: GROUP }),
      media({ guard, group: GROUP }),
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
