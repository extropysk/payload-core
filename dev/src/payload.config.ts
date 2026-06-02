import { buildConfig } from 'payload/config'
import path from 'path'
import Examples from './collections/Examples'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Guard, Permission } from '@extropysk/express-core'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { corePlugin, contentPlugin } from '../../src/index'

const ROLES = ['admin', 'user']

const getRolePermissions = (role: unknown): Permission[] => {
  return []
}

const guard = new Guard({
  getRolePermissions,
})

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  editor: lexicalEditor({}),
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: ['en', 'sk'],
  },
  collections: [Examples],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [corePlugin({ guard, roles: ROLES }), contentPlugin({ guard })],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
