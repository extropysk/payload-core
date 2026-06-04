import express from 'express'
import payload from 'payload'
import { InitOptions } from 'payload/config'
import config from './config'

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

export const start = async (args?: Partial<InitOptions>) => {
  // Initialize Payload
  await payload.init({
    secret: config.secret,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    ...(args || {}),
  })

  // Add your own express routes here

  app.listen(3000)
}

start()
