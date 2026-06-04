import dotenv from 'dotenv'
dotenv.config()

interface Config {
  databaseUri: string
  secret: string
}

const config: Config = {
  databaseUri: process.env.DATABASE_URI,
  secret: process.env.PAYLOAD_SECRET,
}

export default config
