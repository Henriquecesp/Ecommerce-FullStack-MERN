import App from './bootstrap.app'
import * as dotenv from 'dotenv'
import Routes from './Routes'

const endpoints = new Routes()

dotenv.config()
let path
switch (process.env.NODE_ENV) {
  case 'testing':
    path = `${__dirname}/../../.env.testing`
    break
  case 'unitTesting':
    path = `${__dirname}/../../.env.testing`
    break
  default:
    path = `${__dirname}/../../.env`
}
dotenv.config({ path: path })

const app = new App({
  port: process.env.PORT || 3333,
  routes: endpoints.router,
  database: process.env.NODE_ENV !== 'unitTesting',
})

export default app.app
