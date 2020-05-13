import { Request, Response, NextFunction } from 'express'
import User from '../Models/User'
import { getRepository } from 'typeorm'

class AuthUserMiddleware {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    // all Middleware logic

    return next()
  }
}

export default AuthUserMiddleware
