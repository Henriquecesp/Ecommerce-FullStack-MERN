import { Request, Response, NextFunction } from 'express'
import AppError from './App/Errors/AppError'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'

class Handler {
  public createHandler(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response<Error | AppError> {
    const dedsec = new SecResponse()

    if (err instanceof AppError) {
      const res = dedsec.withError(
        err.dataObj,
        err.message,
        err.name,
        err.statusCode,
      )

      return response.status(err.statusCode).json(res)
    }

    if (
      process.env.NODE_ENV === 'testing' ||
      process.env.NODE_ENV === 'development'
    ) {
      const res = dedsec.withError({}, err.message)

      return response.status(500).json(res)
    }

    const res = dedsec.withError({}, err.message)

    return response.status(500).json(res)
  }
}

export default Handler
