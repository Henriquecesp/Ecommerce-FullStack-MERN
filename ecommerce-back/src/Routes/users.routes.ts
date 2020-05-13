import { Router } from 'express'

import UsersController from '../App/Controllers/Client/UsersController'
import AuthUserMiddleware from '../App/Middlewares/AuthUserMiddleware'

const summonerRouter = Router()

const Controller = new UsersController()
const AuthenticatedUser = new AuthUserMiddleware()

summonerRouter.post('/', AuthenticatedUser.handle, Controller.store)

export default summonerRouter
